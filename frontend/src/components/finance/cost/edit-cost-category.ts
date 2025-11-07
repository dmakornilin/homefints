import {AuthUtils} from "../../../utils/auth-util";
import {HttpUtils} from "../../../utils/http-utils";
import {ValidationUtils} from "../../../utils/validation-utils";
import type {NewRouteFunction} from "../../../types/util-types/new-route.type";
import {CommonParams} from "../../../utils/common_params";
import type {ValidationElement} from "../../../types/html-service.types/validation.types";
import type {DefaultResponseType} from "../../../types/respose.types/default-response.type";
import type {NaveElmType} from "../../../types/html-service.types/nave-elm.type";

export class EditCostCategory {
    private readonly openNewRoute:NewRouteFunction;
    public commonParams:CommonParams | undefined;
    private readonly categoryName:HTMLInputElement | null = null;
    private readonly validations: ValidationElement[] | null = null;


    constructor(openNewRoute:NewRouteFunction, commonParams:CommonParams | undefined) {
        this.openNewRoute = openNewRoute;
        if (!AuthUtils.isLogin()) {
            this.openNewRoute('/login');
        } else {
              let elm: HTMLElement | null = null;
              elm =document.getElementById("add-name");
              if (!elm) {return}
            this.categoryName = elm as HTMLInputElement;
            this.commonParams = commonParams;
            this.initial();
            this.validations = [
                {element: this.categoryName}
            ]
            elm=document.getElementById("update-category");
            if (elm) { elm.addEventListener("click", this.addCategory.bind(this)); }
        }
    }

    private async addCategory():Promise<void> {
        if (!this.validations || !this.categoryName || !this.commonParams) {return}
        if (ValidationUtils.validateForm(this.validations)) {
            // console.log('Прошел валидацию');
            if (ValidationUtils.validateForm(this.validations)) {
                const result:DefaultResponseType = await HttpUtils.request('/categories/expense/' + this.commonParams.currents.currentCostCtg, 'PUT', true,
                    {
                        title: this.categoryName.value,
                    });
                if (result.error) {
                    this.categoryName.classList.add('is-invalid');
                    return;
                } else {
                    this.openNewRoute('/costs');
                }
            }
        }
    }

    private initial():void {
        if (!this.categoryName) {return;}
        const com_prm:CommonParams | undefined= this.commonParams;
        if (!com_prm) { return; }
        if (!com_prm.hasOwnProperty("navElements")) { return; }
        const navs: NaveElmType | null = com_prm.navElements;
        if (!navs) { return; }
          const cost_ctg:string |null= com_prm.currents.costCategory;
          if (!cost_ctg) { return; }
        (this.categoryName as HTMLInputElement).value = cost_ctg;
            com_prm.setCtgCost();
           (navs.incomeNavBottom as HTMLElement).dispatchEvent(new Event('click'))
    }
}
