import type { NewRouteFunction } from "../../../types/util-types/new-route.type";
import { CommonParams } from "../../../utils/common_params";
export declare class EditCostCategory {
    private readonly openNewRoute;
    commonParams: CommonParams | undefined;
    private readonly categoryName;
    private readonly validations;
    constructor(openNewRoute: NewRouteFunction, commonParams: CommonParams | undefined);
    private editCategory;
    private initial;
}
//# sourceMappingURL=edit-cost-category.d.ts.map