import type { NewRouteFunction } from "../../../types/util-types/new-route.type";
import { CommonParams } from "../../../utils/common_params";
import { CategorySwodRecord } from "../../../types/data-prm.types/category-select.type";
export declare class PlIncomeEdit {
    private readonly openNewRoute;
    commonParams: CommonParams | undefined;
    private readonly categoryElement;
    private readonly dateElement;
    private readonly amountElement;
    private readonly commentElement;
    private readonly commonErrorElement;
    private readonly validations;
    upd_data: CategorySwodRecord;
    constructor(openNewRoute: NewRouteFunction, commonParams: CommonParams | undefined);
    private checkParamsToUpdate;
    updateTransact(): Promise<void>;
    showParams(): void;
    private showCategories;
    initial(): Promise<void>;
}
//# sourceMappingURL=pl-income-edit.d.ts.map