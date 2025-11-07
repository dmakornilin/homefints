import {ValidationUtils} from "../../../utils/validation-utils";
import {AuthUtils} from "../../../utils/auth-util";
import {HttpUtils} from "../../../utils/http-utils";
import type {NewRouteFunction} from "../../../types/util-types/new-route.type";
import {CommonParams} from "../../../utils/common_params";
import type {ValidationElement} from "../../../types/html-service.types/validation.types";
import type {DefaultResponseType} from "../../../types/respose.types/default-response.type";
import type {CtgListElement} from "../../../types/data-prm.types/dt-choice.types";

export class PlIncomeAdd {

    private readonly openNewRoute: NewRouteFunction;
    public commonParams: CommonParams | undefined;
    private readonly categoryElement: HTMLInputElement | null = null;
    private readonly dateElement: HTMLInputElement | null = null;
    private readonly amountElement: HTMLInputElement | null = null;
    private readonly commentElement: HTMLInputElement | null = null;
    private readonly commonErrorElement: HTMLElement | null = null;
    private readonly validations: ValidationElement[] | null = null;


    constructor(openNewRoute:NewRouteFunction, commonParams:CommonParams | undefined) {
        this.openNewRoute = openNewRoute;
        if (AuthUtils.isLogin()) {
            this.commonParams = commonParams;
            this.initial();

            let elm: HTMLElement | null;
               elm= document.getElementById("categ-select");
             if (!elm) return;
            this.categoryElement = elm as HTMLInputElement;
               elm= document.getElementById("dateInput");
            if (!elm) return;
            this.dateElement = elm as HTMLInputElement;
               elm= document.getElementById("amountInput");
            if (!elm) return;
            this.amountElement = elm as HTMLInputElement;
               elm= document.getElementById("form-select");
            if (!elm) return;
            this.commonErrorElement = elm;
            elm.classList.remove('is-invalid');
               elm= document.getElementById("descriptionInput");
            if (!elm) return;
            this.commentElement = elm as HTMLInputElement;
               // console.log(this.commonErrorElement);
            this.validations = [
                {element: this.categoryElement},
                {element: this.dateElement},
                {element: this.amountElement},
                {element: this.commentElement}
            ]
            elm=document.getElementById("create");
            if (!elm) return;
            elm.addEventListener("click", this.addTransact.bind(this));
            this.loadData();
        } else {
            this.openNewRoute('/login');
        }
    }

   private async addTransact():Promise<void> {
       if (!this.amountElement || !this.dateElement || !this.commentElement || !this.categoryElement || !this.commonErrorElement || !this.validations) return;
        this.commonErrorElement.classList.remove('is-invalid');
        if (ValidationUtils.validateForm(this.validations)) {
            if (await this.saveTransact()) {
                this.openNewRoute('/finance-pl');
            }
            this.commonErrorElement.classList.add("is-invalid");
        } else {
            this.commonErrorElement.classList.add('is-invalid');
        }
    }


   private async  saveTransact():Promise<boolean> {
       if (!this.amountElement || !this.dateElement || !this.commentElement || !this.categoryElement ) { return false}
        const result:DefaultResponseType=await HttpUtils.request('/operations','POST', true,
            {
                type: 'income',
                amount: this.amountElement.value,
                date: this.dateElement.value,
                comment: this.commentElement.value,
                category_id: parseInt(this.categoryElement.value),
            });
         if (result.error ) {
             return false;
         } else {return true}
    }

   private initial():void {
        if (this.commonParams) {
            // this.commonErorElement.classList.remove("is-invalid");
            this.commonParams.setNavPl();
        }
    }


   private showCategories(ctgList:CtgListElement[]):void {
       if (!this.categoryElement) {return}
       let ctgElement:CtgListElement | undefined;
        for (let i:number = 0; i < ctgList.length ; i++) {
            ctgElement = ctgList[i];
            if (ctgElement &&  ctgElement.id && ctgElement.title) {
                const optionElement = document.createElement('option');
                optionElement.innerText = ctgElement.title;
                optionElement.setAttribute('value', ctgElement.id.toString());
                if (i===0) { optionElement.setAttribute('selected', 'true');}
                this.categoryElement.appendChild(optionElement);
            }
        }
    }




    public async  loadData():Promise<void> {
        const com_prm: CommonParams | undefined = this.commonParams;
        if (!com_prm) {
            return;
        }
        if (!com_prm.hasOwnProperty("categories")) {
            return;
        }
        if (await com_prm.reloadCostCategories()) {
            await this.showCategories(com_prm.categories.incomeCategories);
        }
    }
}


