import { type DataTransElement, ElmDtFlags, type GroupSwodElement } from "../types/data-prm.types/dt-choice.types";
import type { ValidationElement } from "../types/html-service.types/validation.types";
export declare class ChoiceDataModule {
    flag: ElmDtFlags | null;
    is_dtl: boolean;
    flg0Element: HTMLInputElement | null;
    flg1Element: HTMLInputElement | null;
    flg2Element: HTMLInputElement | null;
    flg3Element: HTMLInputElement | null;
    flg4Element: HTMLInputElement | null;
    flg5Element: HTMLInputElement | null;
    dFromElement: HTMLInputElement | null;
    dToElement: HTMLInputElement | null;
    validations: ValidationElement[];
    dataTrans: DataTransElement[];
    constructor();
    toGroup2arr(incArray: GroupSwodElement[], costArray: GroupSwodElement[]): void;
    sbrosChoce(): void;
    private sbrosValidationFlag;
    setChoiceFlag(): void;
    validate(): boolean;
    refreshTransact(resp: DataTransElement[]): void;
    reloadOperations(): Promise<boolean>;
    initial(): void;
}
//# sourceMappingURL=choice-data-module.d.ts.map