import type { NewRouteFunction } from "../../../types/util-types/new-route.type";
import { CommonParams } from "../../../utils/common_params";
export declare class FinancePl {
    private readonly openNewRoute;
    commonParams: CommonParams | undefined;
    private readonly tableElement;
    private readonly removeBtnElement;
    constructor(openNewRoute: NewRouteFunction, commonParams: CommonParams | undefined);
    removeTransId(event: Event): Promise<void>;
    initial(): void;
    setChoiceFlag(element: any): Promise<void>;
    private toChoiceTransAct;
    private showOperations;
}
//# sourceMappingURL=finance-pl.d.ts.map