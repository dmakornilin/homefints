import type { NewRouteFunction } from "../types/util-types/new-route.type";
import { CommonParams } from "../utils/common_params";
export declare class Dashboard {
    private readonly openNewRoute;
    commonParams: CommonParams | undefined;
    private iniFlg;
    private income;
    private cost;
    private readonly pieCharts;
    constructor(openNewRoute: NewRouteFunction, commonParams: CommonParams | undefined);
    setChoiceFlag(event: any): Promise<void>;
    private initial;
}
//# sourceMappingURL=dashboard.d.ts.map