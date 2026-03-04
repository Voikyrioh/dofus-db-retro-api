# Generate Unit Tests

Generate unit tests for the file at: $ARGUMENTS

## Project test stack

- **Runner:** Mocha + Chai (BDD) via `npm test`
- **TypeScript:** executed by `tsx`, path aliases from `tsconfig.json` resolve at runtime
- **No mocking library** — use real implementations unless the dependency is external I/O

## Where to put the test file

| Source location | Test location |
|----------------|---------------|
| `src/domain/entities/foo.entity.ts` | `tests/domain/foo-entity.spec.ts` |
| `src/config/bar.ts` | `src/config/__tests__/bar.test.ts` |
| `src/.../<anything>.ts` | `tests/<mirrored-path>.spec.ts` (preferred) |

The `.mocharc.json` `spec` field already covers both `src/**/__tests__/**/*.test.ts` and `tests/**/*.spec.ts`.

## Import style

```typescript
import { expect } from 'chai'
import { SomeClass } from '../../src/path/to/module'  // relative, no extension
```

Use the relative path from the test file to the source. Do **not** use path aliases (`@entities` etc.) in test files — rely on relative paths for clarity.

## Test structure (BDD)

```typescript
describe('ClassName', () => {
    describe('methodName', () => {
        it('should <expected behavior>', () => { ... })
        it('should throw when <invalid input>', () => { ... })
    })
})
```

- One `describe` block per class, one nested `describe` per method/behaviour group
- `it()` descriptions start with "should"
- Use `beforeEach` / `afterEach` only when shared state is genuinely needed

## Assertion patterns

```typescript
// equality
expect(value).to.equal(expected)
expect(obj).to.deep.equal({ ... })

// type/instance
expect(value).to.be.a('string')
expect(instance).to.be.instanceOf(SomeClass)

// truthiness / existence
expect(value).to.be.true
expect(value).to.not.be.empty

// pattern match
expect(id).to.match(/^[0-9A-HJKMNP-TV-Z]{26}$/)   // ULID

// throws (sync)
expect(() => new Foo('bad')).to.throw()

// async
const result = await SomeClass.asyncMethod()
expect(result).to.be.instanceOf(SomeClass)
```

## Domain-specific context

### Entities (`src/domain/entities/`)
- Entities use **Zod validators** in the constructor — test valid and invalid inputs
- IDs are **ULIDs** — generate with `import { ulid } from 'ulid'`
- Password hashing uses the `argon2` npm package (Promise-based) — no need to mock, it's fast
- `verifyPassword(plain)` wraps `argon2.verify()` — test with a real hash from `CreateAccount`

### Reference test (account.entity.spec.ts)
```typescript
import { expect } from 'chai'
import { ulid } from 'ulid'
import { AccountEntity } from '../../src/domain/entities/account.entity'

describe('AccountEntity', () => {
    describe('constructor', () => {
        it('should create an instance with all fields assigned correctly', () => {
            const id = ulid()
            const entity = new AccountEntity(id, 'testuser', 'hashedpassword', 'test@example.com')
            expect(entity.id).to.equal(id)
            expect(entity.username).to.equal('testuser')
        })
        it('should throw when id is not a valid ULID', () => {
            expect(() => new AccountEntity('bad-id', 'user', 'hash', 'a@b.com')).to.throw()
        })
    })

    describe('CreateAccount', () => {
        it('should resolve to an AccountEntity instance', async () => {
            const entity = await AccountEntity.CreateAccount('user', 'pass', 'a@b.com')
            expect(entity).to.be.instanceOf(AccountEntity)
        })
    })
})
```

## Instructions

1. **Read the target file** at `$ARGUMENTS` first
2. Identify every public method, static factory, and constructor
3. Write a test case for each behaviour path (happy path + error cases)
4. For async methods use `async/await` in the test body
5. Write the test file to the correct location (see table above)
6. Run `npm test` and fix any failures before finishing
