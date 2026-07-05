import { DomainError, FunctionalError, ServiceError } from "@errors/app.error";
import { handleHttpErrors } from "@errors/handle-http-errors";
import { betterZodValidator } from "@libraries";
import { expect } from "chai";
import type { Context } from "hono";
import { Hono } from "hono";
import { z } from "zod";

/** Minimal fake context capturing the (body, status) passed to c.json. */
function fakeCtx(): Context {
    return {
        json: (body: unknown, status?: number) => ({ body, status }),
    } as unknown as Context;
}

describe("handleHttpErrors — three families", () => {
    it("relays a functional error: code + message + 4xx", () => {
        const res = handleHttpErrors(
            new FunctionalError("not-found", "Account not found"),
            fakeCtx(),
        ) as unknown as { body: { code: string; message: string }; status: number };
        expect(res.status).to.equal(404);
        expect(res.body).to.deep.equal({ code: "not-found", message: "Account not found" });
    });

    it("hides a domain error behind a generic 500", () => {
        const res = handleHttpErrors(
            new DomainError("entity broke", new Error("raw")),
            fakeCtx(),
        ) as unknown as { body: { message: string }; status: number };
        expect(res.status).to.equal(500);
        expect(res.body.message).to.equal("Internal server error");
    });

    it("hides a service error behind a generic 502", () => {
        const res = handleHttpErrors(
            new ServiceError("mysql down", new Error("ECONNREFUSED")),
            fakeCtx(),
        ) as unknown as { body: { message: string }; status: number };
        expect(res.status).to.equal(502);
        expect(res.body.message).to.equal("Bad gateway");
    });

    it("treats a raw ZodError as a domain error (500)", () => {
        const zodErr = z.object({ a: z.string() }).safeParse({ a: 1 });
        const res = handleHttpErrors(
            (zodErr as { error: unknown }).error,
            fakeCtx(),
        ) as unknown as { status: number };
        expect(res.status).to.equal(500);
    });

    it("wraps an unknown error as a domain error (500)", () => {
        const res = handleHttpErrors(new Error("boom"), fakeCtx()) as unknown as {
            status: number;
        };
        expect(res.status).to.equal(500);
    });
});

describe("betterZodValidator — endpoint input", () => {
    function app() {
        const a = new Hono();
        a.post(
            "/x",
            betterZodValidator("json", z.object({ name: z.string() })),
            (c) => c.json(c.req.valid("json")),
        );
        a.onError(handleHttpErrors);
        return a;
    }

    it("rejects an invalid payload with a functional error + per-field details", async () => {
        const res = await app().request("/x", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: 123 }),
        });
        expect(res.status).to.equal(400);
        const body = (await res.json()) as { code: string; details: unknown[] };
        expect(body.code).to.equal("invalid-payload");
        expect(body.details).to.be.an("array").with.length.greaterThan(0);
    });
});
