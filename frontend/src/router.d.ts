import { CommonParams } from "./utils/common_params";
export declare class Router {
    private readonly titlePageElement;
    private readonly contentPageElement;
    private admiLteStyleElement;
    commonParams: CommonParams | undefined;
    private routes;
    constructor();
    private defineRouters;
    private initEvents;
    private openNewRoute;
    private clickHandler;
    private activateRoute;
    iniLoad(): Promise<void>;
}
//# sourceMappingURL=router.d.ts.map