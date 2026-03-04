import { RegisterAccountUseCase } from "./auth/register.usecase";
import { LoginUseCase } from "./auth/login.usecase";

class Usecases {
    auth: {
        readonly register: RegisterAccountUseCase;
        readonly login: LoginUseCase;
    }

    constructor() {
        this.auth = {
            register: new RegisterAccountUseCase(),
            login: new LoginUseCase(),
        };
    }
}

export const usecases = new Usecases();
