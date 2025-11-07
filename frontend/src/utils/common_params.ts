import {HttpUtils} from "./http-utils";
import {ChoiceDataModule} from "./choice-data-module";
import {NumberUtils} from "./number-utils";
import {AuthInfoKey, type UserInfo} from "../types/util-types/user-info.type";
import type {NaveElmType} from "../types/html-service.types/nave-elm.type";
import {
    CategoriesClass,
    type CtgListElement,
    type DataTransElement
} from "../types/data-prm.types/dt-choice.types";
import type {CurrentChoiceCtg} from "../types/html-service.types/current-choice.type";
import type {DefaultResponseType} from "../types/respose.types/default-response.type";
import type {IdtransResposeType} from "../types/respose.types/idtrans-respose.type";
import type {BalanceResponseType} from "../types/respose.types/balance-response.type";
import type {NewRouteFunction} from "../types/util-types/new-route.type";


export class CommonParams {
    public glDataModule: ChoiceDataModule = new ChoiceDataModule();
    public transactDataModule: ChoiceDataModule = new ChoiceDataModule();
    public loginInfo: UserInfo = {};
    public balanceElm: HTMLElement | null = null;
    public navElements: NaveElmType | null = null;
    public transId: number | null = null;
    public kol: number | null = null;
    public tansIdData: DataTransElement = {id: null, date: null, amount: null, category: null, comment: null, type: null,  category_id: null };
    public categories: CategoriesClass = new CategoriesClass();
    public openNewRoute:NewRouteFunction;
    // public balanceResp:{}= {};
    public currents: CurrentChoiceCtg = {currentCostCtg: null, costCategory:  null,  currentIncomeCtg:  null,  incomeCategory:  null  }
    constructor(openNewRoute:NewRouteFunction) {
        this.openNewRoute = openNewRoute;
    }


    public async reshowBalance():Promise<boolean> {
        if (this.balanceElm) {
            const result:DefaultResponseType | BalanceResponseType  = await HttpUtils.request('/balance');
            if ( result.hasOwnProperty('error') && result.error) {
                return false;
            }
            this.balanceElm.innerText = NumberUtils.numberToStringWithThDiv((result as BalanceResponseType).response.balance) + '$';
            return true;
        }
        return false;
    }

    private reloadCategories(ctgList:CtgListElement[], resp:CtgListElement[]):void {
        this.kol = resp.length;
        while (ctgList.length > 0) {
            ctgList.pop();
        }
        for (let i = 0; i < resp.length; i++) {
            ctgList.push((resp[i] as CtgListElement));
        }
    }


    private findCategoryByName(ctgList:CtgListElement[]):void {
        if (!this.tansIdData) { return;}
        let elm: CtgListElement | undefined;
        elm = ctgList.find( (elem:CtgListElement) => elem.title === (this.tansIdData as DataTransElement).category);
        if (elm) {
            this.tansIdData.category_id = elm.id;
        }
    }

    public findCtgIdIncome():void {
       if (this.categories) { this.findCategoryByName(this.categories.incomeCategories as CtgListElement[])}
    }

    public findCtgIdCost() {
        if (this.categories) {this.findCategoryByName(this.categories.costCategories as CtgListElement[])}
    }


    public async reloadByTransId():Promise<boolean> {
        const result: DefaultResponseType | IdtransResposeType = await HttpUtils.request('/operations/' + this.transId, 'GET', true);
        if (result.error || !result.hasOwnProperty('response')) {
            return false;
        } else {
            this.tansIdData.id = (result as IdtransResposeType).response.id;
            this.tansIdData.date = (result as IdtransResposeType).response.date;
            this.tansIdData.amount = (result as IdtransResposeType).response.amount;
            this.tansIdData.category = (result as IdtransResposeType).response.category;
            this.tansIdData.comment = (result as IdtransResposeType).response.comment;
            this.tansIdData.category_id = null;
            return true;
        }
    }

    public async deleteTransAct():Promise<boolean> {
        const result:DefaultResponseType = await HttpUtils.request('/operations/' + this.transId, 'DELETE');
        if (result.error) { return false;  }
         return true
    }


    async reloadIncomeCategories() {
        const result = await HttpUtils.request('/categories/income');
        this.reloadCategories(this.categories.incomeCategories, result.response);
        if (result.error || !result.response) {
            return false;
        } else {
            return true;
        }
    }

    async reloadCostCategories() {
        const result = await HttpUtils.request('/categories/expense');
        this.reloadCategories(this.categories.costCategories, result.response);
        if (result.error || !result.response) {  return false; }
            return true;
    }


    public refreshUserInfo():void {
        const current_user:string | null = localStorage.getItem(AuthInfoKey.userInfo);
        if (current_user) {
            const user_info:UserInfo = JSON.parse(current_user);

            if (user_info && user_info.hasOwnProperty('id') && user_info.hasOwnProperty('name') && user_info.hasOwnProperty('email') && user_info.hasOwnProperty('lastName')) {
                (this.loginInfo as UserInfo).id = user_info.id;
                (this.loginInfo as UserInfo).email = user_info.email;
                (this.loginInfo as UserInfo).name = user_info.name;
                (this.loginInfo  as UserInfo).lastName = user_info.lastName;
                (this.loginInfo as UserInfo).fio = user_info.name + ' ' + user_info.lastName;
            }
            // this.loginInfo.fio ='Роман Чернов';
        }
    }

    public setCtgCost():void {
        this.sbrosChoiceNav();
        let nav_element: NaveElmType | null = this.navElements;
        if (!nav_element) { return }
        if (nav_element.ctgNavElement) {
            nav_element.ctgNavElement.classList.add("border-ramka");
        }
        if (nav_element.ctgCostNavElement) {
            nav_element.ctgCostNavElement.classList.add("active");
        }
        if (nav_element.incomeNavBottom) {
            nav_element.incomeNavBottom.classList.remove("rounded-2");
            nav_element.incomeNavBottom.classList.remove("rounded-0");
            nav_element.incomeNavBottom.classList.add("rounded-0");
        }
    }

    public setCtgIncome():void {
        this.sbrosChoiceNav();
        let nav_element: NaveElmType | null = this.navElements;
        if (!nav_element) { return }
        if (nav_element.ctgNavElement) {
            nav_element.ctgNavElement.classList.add("border-ramka");
        }
        if (nav_element.ctgAccordionElement) {
            nav_element.ctgAccordionElement.classList.remove("collapse");
        }
        if (nav_element.ctgIncomeNavElement) {
            nav_element.ctgIncomeNavElement.classList.add("active");
        }
        if (nav_element.incomeNavBottom) {
            nav_element.incomeNavBottom.classList.remove("rounded-2");
            nav_element.incomeNavBottom.classList.remove("rounded-0");
            nav_element.incomeNavBottom.classList.add("rounded-0");
        }
    }


    public setNavPl():void {
        this.sbrosChoiceNav();
        let nav_element: NaveElmType | null = this.navElements;
        if (!nav_element) { return }
        if (nav_element.plNavElement) {
            nav_element.plNavElement.classList.add('active');
        }
    }

    public setNavMain():void {
        this.sbrosChoiceNav();
        let nav_element: NaveElmType | null = this.navElements;
        if (!nav_element) { return }
        if (nav_element.startNavElement) {
            nav_element.startNavElement.classList.add('active');
        }
    }


    public sbrosChoiceNav(): void {
        if (!this.navElements) {  return  }
        let nav_element: NaveElmType | null = this.navElements;
        if (!nav_element) { return }

        if (nav_element.ctgNavElement) {
            nav_element.ctgNavElement.classList.remove('active');
            nav_element.ctgNavElement.classList.remove('border-ramka');
        }
        if (nav_element.ctgAccordionElement) {
            nav_element.ctgAccordionElement.classList.add('collapse');
        }
        if (nav_element.ctgIncomeNavElement) {
            nav_element.ctgIncomeNavElement.classList.remove('active');
        }

        if (nav_element.plNavElement) {
            nav_element.plNavElement.classList.remove('active');
        }

        if (nav_element.startNavElement) {
            nav_element.startNavElement.classList.remove('active');
        }

        if (nav_element.incomeNavBottom) {
            nav_element.incomeNavBottom.classList.remove('rounded-2');
            nav_element.incomeNavBottom.classList.remove('rounded-0');
            nav_element.incomeNavBottom.classList.add('rounded-2');
        }
    }


}