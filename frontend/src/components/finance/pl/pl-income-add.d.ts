import type { NewRouteFunction } from "../../../types/util-types/new-route.type";
import { CommonParams } from "../../../utils/common_params";
export declare class PlIncomeAdd {
    private readonly openNewRoute;
    commonParams: CommonParams | undefined;
    private readonly categoryElement;
    private readonly dateElement;
    private readonly amountElement;
    private readonly commentElement;
    private readonly commonErrorElement;
    private readonly validations;
    constructor(openNewRoute: NewRouteFunction, commonParams: CommonParams | undefined);
    private addTransact;
    private saveTransact;
    private initial;
    private showCategories;
    loadData(): Promise<void>;
}
//# sourceMappingURL=pl-income-add.d.ts.map