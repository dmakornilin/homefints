import {AuthUtils} from "../../utils/auth-util";
import {HttpUtils} from "../../utils/http-utils";
import {ValidationUtils} from "../../utils/validation-utils";
import type {NewRouteFunction} from "../../types/util-types/new-route.type";
import {AuthInfoKey} from "../../types/util-types/user-info.type";
import type {ValidationElement, ValidationOption} from "../../types/html-service.types/validation.types";
import type {DefaultResponseType} from "../../types/respose.types/default-response.type";
import type {LoginResponseRecord, LoginResponseType} from "../../types/respose.types/auth-response.type";


export class Login {

    private readonly openNewRoute: NewRouteFunction;
    private readonly emailElement: HTMLInputElement | null = null;
    private readonly passwordElement: HTMLInputElement | null = null;
    private readonly commonErrorElement: HTMLElement | null = null;
    private readonly rememberMeElement: HTMLInputElement | null = null;
    private readonly validations: ValidationElement[] | null = null;


    constructor(openNewRoute: NewRouteFunction) {
        this.openNewRoute = openNewRoute;
        console.log(openNewRoute);

        if (AuthUtils.getAuthInfo(AuthInfoKey.accessToken)) {
            this.openNewRoute('/');
            return;
        }
        let elm: HTMLElement | null;
        elm = document.getElementById("login-email");
        if (elm) {
            this.emailElement = elm as HTMLInputElement;
        }
        elm = document.getElementById("login-password");
        if (elm) {
            this.passwordElement = elm as HTMLInputElement;
        }
        this.commonErrorElement = document.getElementById("login-common-error");
        elm = document.getElementById("login-remember-me");
        if (elm) {
            this.rememberMeElement = elm as HTMLInputElement;
        }
        if (this.emailElement && this.passwordElement) {
            this.validations = [
                {
                    element: this.emailElement,
                    options: ({"pattern": ValidationUtils.regularPatterns().email} as ValidationOption)
                },
                {
                    element: this.passwordElement,
                    options: {"pattern": ValidationUtils.regularPatterns().password} as ValidationOption
                }
            ]
        }
        elm = document.getElementById("login-process-button");
        if (elm) {
            elm.addEventListener("click", this.login.bind(this));
        }
    }

    private async login(): Promise<void> {
        if (!this.validations || !this.emailElement || !this.passwordElement || !this.rememberMeElement) {
            return
        }
        (this.commonErrorElement as HTMLElement).style.display = "none";
        if (ValidationUtils.validateForm(this.validations)) {
            // console.log('Прошел валидацию');
            const result: DefaultResponseType | LoginResponseType = await HttpUtils.request('/login', 'POST', false,
                {
                    email: this.emailElement.value,
                    password: this.passwordElement.value,
                    rememberMe: this.rememberMeElement.checked,
                });

            if (result.error || !result.hasOwnProperty('response')) {
                (this.commonErrorElement as HTMLElement).style.display = "block";
                return;
            }
            const resp: LoginResponseRecord = (result as LoginResponseType).response;
            AuthUtils.setAuthInfo(resp.tokens.accessToken, resp.tokens.refreshToken, {
                id: resp.user.id,
                name: resp.user.name,
                lastName: resp.user.lastName,
                email: this.emailElement.value
            });
            this.openNewRoute('/');
        }
    }
}

