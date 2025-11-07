import { ChoiceDataModule } from "./choice-data-module";
import { type UserInfo } from "../types/util-types/user-info.type";
import type { NaveElmType } from "../types/html-service.types/nave-elm.type";
import { CategoriesClass, type DataTransElement } from "../types/data-prm.types/dt-choice.types";
import type { CurrentChoiceCtg } from "../types/html-service.types/current-choice.type";
import type { NewRouteFunction } from "../types/util-types/new-route.type";
export declare class CommonParams {
    glDataModule: ChoiceDataModule;
    transactDataModule: ChoiceDataModule;
    loginInfo: UserInfo;
    balanceElm: HTMLElement | null;
    navElements: NaveElmType | null;
    transId: number | null;
    kol: number | null;
    tansIdData: DataTransElement;
    categories: CategoriesClass;
    openNewRoute: NewRouteFunction;
    currents: CurrentChoiceCtg;
    constructor(openNewRoute: NewRouteFunction);
    reshowBalance(): Promise<boolean>;
    private reloadCategories;
    private findCategoryByName;
    findCtgIdIncome(): void;
    findCtgIdCost(): void;
    reloadByTransId(): Promise<boolean>;
    deleteTransAct(): Promise<boolean>;
    reloadIncomeCategories(): Promise<boolean>;
    reloadCostCategories(): Promise<boolean>;
    refreshUserInfo(): void;
    setCtgCost(): void;
    setCtgIncome(): void;
    setNavPl(): void;
    setNavMain(): void;
    sbrosChoiceNav(): void;
}
//# sourceMappingURL=common_params.d.ts.map