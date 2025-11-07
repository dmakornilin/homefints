import type {
    ValidationElement,
    ValidationOption,
    ValidationPatternType,
} from "../types/html-service.types/validation.types";

export class ValidationUtils {

    static regularPatterns(): ValidationPatternType {
        return {
            email: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,
            password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
            name: /^[А-Я][А-Яа-яё\s]*$/
        }
    }

    static validateForm(validations: ValidationElement[]): boolean {
        let isValid = true;
        for (let i = 0; i < validations.length; i++) {
            let option: ValidationElement = (validations[i] as ValidationElement);

            if (option.hasOwnProperty('options')) {
                if (!this.validateField(option.element, option.options)) {
                    isValid = false;
                }
            } else {
                if (!this.validateField(option.element, null)) {
                    isValid = false;
                }
            }
        }
        return isValid;
    }


    static validateField(element: HTMLInputElement, options: ValidationOption | null): boolean {
        let is_value: boolean = false;
        if (element.value) {
            is_value = true;
        }
        let result: boolean = false;
        if (options) {
            if (options.hasOwnProperty('pattern') && is_value) {
                if (element.value && element.value.match(options.pattern)) {
                    result = true
                }
            } else if (options.hasOwnProperty('compareTo')) {
                if (element.value && element.value === options.compareTo) {
                    result = true
                }
            }
        }
        if (result) {
            element.classList.remove('is-invalid');
        } else {
            element.classList.add('is-invalid');
        }
        return result;
    }
}

