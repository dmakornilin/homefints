export declare class RouteElement {
    route: string;
    title: string | null;
    template: string | null;
    filePathTemplate: string | null;
    styles: string[];
    scripts: string[];
    useLayout: string | null;
    load?(): void | null;
    unload?(): void | null;
    constructor(route: string, load: any, unload: any);
}
export declare class RouteList {
    routes: RouteElement[];
    constructor();
    addRoute(route: string, load: any, unload: any): RouteElement;
}
//# sourceMappingURL=route.type.d.ts.map