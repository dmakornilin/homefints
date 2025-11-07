// export type RouteType =
//     {
//         route: string,
//         title: string|null,
//         template?: string,
//         filePathTemplate: string | null,
//         styles?: string[] |null,
//         scripts?: string[] |null,
//         useLayout: string | null ,
//         load?(): void | null,
//         unload?(): void | null
//     };

export class RouteElement {
    public route: string;
    public title: string | null = null;
    public template: string | null = null;
    public filePathTemplate: string | null = null;
    public styles: string[] = [];
    public scripts: string[] = [];
    public useLayout: string | null = null;

    public load?(): void | null ;

    public unload?(): void | null;

    constructor(route: string, load: any, unload: any) {
        this.route = route;
        this.load = load;
        this.unload = unload;
    }
}

export class RouteList {
    routes: RouteElement[];
    constructor() {
        this.routes = [];
    }
    public addRoute(route: string, load: any, unload: any):RouteElement {
        let rt:RouteElement= new RouteElement(route,load,unload);
        this.routes.push(rt);
        return rt;
    }

}