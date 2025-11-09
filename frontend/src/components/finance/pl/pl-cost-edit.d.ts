import type { NewRouteFunction } from "../../../types/util-types/new-route.type";
import { CommonParams } from "../../../utils/common_params";
import { CategorySwodRecord } from "../../../types/data-prm.types/category-select.type";
export declare class PlCostEdit {
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
    updateTransact(e: PointerEvent): Promise<void>;
    private showCategories;
    showParams(): void;
    initial(): Promise<void>;
}
//# sourceMappingURL=pl-cost-edit.d.ts.map