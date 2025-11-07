import {AuthUtils} from "../../utils/auth-util";
import {HttpUtils} from "../../utils/http-utils";
import {ValidationUtils} from "../../utils/validation-utils";
import type {NewRouteFunction} from "../../types/util-types/new-route.type";
import {AuthInfoKey} from "../../types/util-types/user-info.type";
import type {ValidationElement, ValidationOption} from "../../types/html-service.types/validation.types";
import type {DefaultResponseType} from "../../types/respose.types/default-response.type";
import type {
    LoginResponseRecord,
    LoginResponseType, SignUpResponseRecord,
    SignUpResponseType
} from "../../types/respose.types/auth-response.type";


export class SignUp {

    private readonly openNewRoute: NewRouteFunction;
    private readonly nameElement:HTMLInputElement | null = null;
    private readonly lastNameElement:HTMLInputElement | null = null;
    private readonly emailElement:HTMLInputElement | null = null;
    private readonly passwordElement:HTMLInputElement | null = null;
    private readonly passwordConfirmElement:HTMLInputElement | null = null;
    private readonly commonErrorElement:HTMLElement | null = null;
    private readonly validations: ValidationElement[] | null = null;


    constructor(openNewRoute:NewRouteFunction) {
        this.openNewRoute = openNewRoute;
        if (AuthUtils.getAuthInfo(AuthInfoKey.accessToken)) {
             this.openNewRoute('/');
             return;
        }
          let elm: HTMLElement | null = null;
             elm=document.getElementById("login-name");
          if (elm) {this.nameElement = elm as HTMLInputElement}
             elm=document.getElementById("login-last-name");
          if (elm) {this.lastNameElement = elm as HTMLInputElement}
             elm=document.getElementById("login-email");
          if (elm) {this.emailElement = elm as HTMLInputElement}
             elm=document.getElementById("login-password");
          if (elm) {this.passwordElement = elm as HTMLInputElement}
             elm=document.getElementById("login-passwordConfirm");
          if (elm) {this.passwordConfirmElement = elm as HTMLInputElement}
        this.commonErrorElement = document.getElementById("login-common-error");
        if (this.nameElement && this.lastNameElement && this.emailElement && this.passwordElement && this.commonErrorElement && this.passwordConfirmElement) {
            this.validations = [
                {element: this.nameElement, options: {pattern: ValidationUtils.regularPatterns().name} as ValidationOption},
                {element: this.lastNameElement, options: {pattern: ValidationUtils.regularPatterns().name} as ValidationOption},
                {element: this.emailElement, options: {pattern: ValidationUtils.regularPatterns().email} as ValidationOption},
                {element: this.passwordElement, options: {pattern: ValidationUtils.regularPatterns().password} as ValidationOption},
                {element: this.passwordConfirmElement, options: {pattern: ValidationUtils.regularPatterns().password} as ValidationOption}
            ]
        }
          elm=document.getElementById("login-process-button");
        if (elm) { elm.addEventListener("click", this.login.bind(this)); }

    }

    public validateForm():boolean {
        if (!this.validations || !this.passwordElement || !this.passwordConfirmElement) {return false}
        let isValid:boolean = ValidationUtils.validateForm(this.validations);
        let psw:string = this.passwordElement.value;
        if (!ValidationUtils.validateField(this.passwordConfirmElement, {compareTo: psw})) {
            isValid = false;
        }
        return isValid;
    }


    public async login():Promise<void> {
        if (!this.commonErrorElement || !this.nameElement || !this.lastNameElement || !this.emailElement || !this.passwordElement || !this.passwordConfirmElement ) { return}

        this.commonErrorElement.style.display = "none";

        if (this.validateForm()) {
            const result:DefaultResponseType = await HttpUtils.request('/signup', 'POST', false,
                {
                    name: this.nameElement.value,
                    lastName: this.lastNameElement.value,
                    email: this.emailElement.value,
                    password: this.passwordElement.value,
                    passwordRepeat: this.passwordConfirmElement.value
                });

            if (result.error) {
                this.commonErrorElement.style.display = "block";
                return;
            }
            const loginResult:DefaultResponseType | SignUpResponseType = await HttpUtils.request('/login', 'POST', false,
                {
                    email: this.emailElement.value,
                    password: this.passwordElement.value,
                    rememberMe: true,
                });

            if (loginResult.error || !loginResult.hasOwnProperty('response')) {
                this.commonErrorElement.style.display = "block";
                return;
            }
            const resp: SignUpResponseRecord = (loginResult as SignUpResponseType).response;
            AuthUtils.setAuthInfo(resp.tokens.accessToken, resp.tokens.refreshToken, {
                id: resp.user.id,
                name: resp.user.name,
                lastName: this.lastNameElement.value,
                email: this.emailElement.value
            });
            this.openNewRoute('/');
        }
    }

}

