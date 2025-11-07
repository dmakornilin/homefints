import type { NewRouteFunction } from "../../../types/util-types/new-route.type";
import { CommonParams } from "../../../utils/common_params";
export declare class AddCostCategory {
    private readonly openNewRoute;
    commonParams: CommonParams | undefined;
    private readonly categoryName;
    private readonly validations;
    constructor(openNewRoute: NewRouteFunction, commonParams: CommonParams | undefined);
    private addCategory;
    private initial;
}
//# sourceMappingURL=add-cost-category.d.ts.map