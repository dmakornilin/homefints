import type { NewRouteFunction } from "../../types/util-types/new-route.type";
import { CommonParams } from "../../utils/common_params";
export declare class Incoms {
    private readonly openNewRoute;
    commonParams: CommonParams | undefined;
    private readonly ctgContainer;
    constructor(openNewRoute: NewRouteFunction, commonParams: CommonParams | undefined);
    private initial;
    private showCategories;
    choiceDelCategory(e: any): Promise<void>;
    private toDeleteCategory;
    private toEditCategory;
    loadData(): Promise<void>;
}
//# sourceMappingURL=incoms.d.ts.map