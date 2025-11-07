import type { NewRouteFunction } from "../../types/util-types/new-route.type";
export declare class SignUp {
    private readonly openNewRoute;
    private readonly nameElement;
    private readonly lastNameElement;
    private readonly emailElement;
    private readonly passwordElement;
    private readonly passwordConfirmElement;
    private readonly commonErrorElement;
    private readonly validations;
    constructor(openNewRoute: NewRouteFunction);
    validateForm(): boolean;
    login(): Promise<void>;
}
//# sourceMappingURL=sign-up.d.ts.map