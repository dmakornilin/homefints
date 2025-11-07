import type { NewRouteFunction } from "../../types/util-types/new-route.type";
import { CommonParams } from "../../utils/common_params";
export declare class Costs {
    private readonly openNewRoute;
    commonParams: CommonParams | undefined;
    private readonly ctgContainer;
    constructor(openNewRoute: NewRouteFunction, commonParams: CommonParams | undefined);
    private initial;
    private showCategories;
    private toDeleteCategory;
    choiceDelCategory(e: any): Promise<void>;
    toEditCategory(e: any): void;
    loadData(): Promise<void>;
}
//# sourceMappingURL=costs.d.ts.map