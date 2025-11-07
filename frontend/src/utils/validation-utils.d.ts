import type { ValidationElement, ValidationOption, ValidationPatternType } from "../types/html-service.types/validation.types";
export declare class ValidationUtils {
    static regularPatterns(): ValidationPatternType;
    static validateForm(validations: ValidationElement[]): boolean;
    static validateField(element: HTMLInputElement, options: ValidationOption | null): boolean;
}
//# sourceMappingURL=validation-utils.d.ts.map