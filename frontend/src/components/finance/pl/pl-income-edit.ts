import {ValidationUtils} from "../../../utils/validation-utils";
import {HttpUtils} from "../../../utils/http-utils";
import type {NewRouteFunction} from "../../../types/util-types/new-route.type";
import {CommonParams} from "../../../utils/common_params";
import type {ValidationElement} from "../../../types/html-service.types/validation.types";
import {CategorySwodRecord, CategoryTypes} from "../../../types/data-prm.types/category-select.type";
import {DateElements, type DateStrVal} from "../../../utils/date-elemets";
import type {DefaultResponseType} from "../../../types/respose.types/default-response.type";
import type {CtgListElement} from "../../../types/data-prm.types/dt-choice.types";





export class PlIncomeEdit {

    private readonly openNewRoute: NewRouteFunction;
    public commonParams: CommonParams | undefined;
    private readonly categoryElement: HTMLInputElement | null = null;
    private readonly dateElement: HTMLInputElement | null = null;
    private readonly amountElement: HTMLInputElement | null = null;
    private readonly commentElement: HTMLInputElement | null = null;
    private readonly commonErrorElement: HTMLElement | null = null;
    private readonly validations: ValidationElement[] | null = null;
    public upd_data:CategorySwodRecord = new CategorySwodRecord();

    constructor(openNewRoute:NewRouteFunction, commonParams:CommonParams | undefined) {
        this.openNewRoute = openNewRoute;
        this.commonParams = commonParams;
       if (!this.commonParams) {return}

        const url = new URL(location.href);
        const s2:string | null =url.searchParams.get('id');
        if (!s2) return;
        this.commonParams.transId=parseInt(s2);
        this.commonParams.choiceTransId=parseInt(s2);

        this.initial();

        let elm: HTMLElement | null =document.getElementById("categ-select");
        if (!elm) return
        this.categoryElement = elm as HTMLInputElement;
            elm= document.getElementById("dateInput");
        if (!elm) return
        this.dateElement = elm as HTMLInputElement;
            elm= document.getElementById("amountInput");
        if (!elm) return
        this.amountElement = elm as HTMLInputElement;
            elm= document.getElementById("descriptionInput");
        if (!elm) return
        this.commentElement = elm as HTMLInputElement;
            elm=document.getElementById("form-select");
        if (!elm) return
        this.commonErrorElement = elm;
        elm.classList.remove('is-invalid');
        this.validations = [
            {element: this.categoryElement},
            {element: this.dateElement},
            {element: this.amountElement},
            {element: this.commentElement}
        ]

        elm=document.getElementById("update");
        if (!elm) return
        elm.addEventListener("click", this.updateTransact.bind(this));
        this.upd_data.type=CategoryTypes.income;
        // this.upd_data = { type : "income" };

    }


    private checkParamsToUpdate():boolean {
        if (!this.dateElement || !this.commonParams || !this.categoryElement || !this.amountElement || !this.commentElement)  return false;
        const com_prm:CommonParams | undefined= this.commonParams;
        if (!com_prm)  return false;

        let result:boolean = false;
        this.upd_data.date = this.dateElement.value;


        const dt:Date |null = (com_prm as CommonParams).tansIdData.date;
        if (!dt) return false;
        if (this.dateElement.value !== dt.toString()) result = true;

        let new_ktg:number = parseInt(this.categoryElement.value);
        this.upd_data.category_id = new_ktg;
        if (new_ktg !== this.commonParams.tansIdData.category_id) {
            result = true;
        }
        let new_sum:number = parseFloat(this.amountElement.value);
        this.upd_data.amount = new_sum;
        if (new_sum !== this.commonParams.tansIdData.amount) {
            result = true;
        }
        this.upd_data.comment = this.commentElement.value;
        if (this.commentElement.value !== this.commonParams.tansIdData.comment) {
            result = true;
        }
        return result;
    }


    public async updateTransact():Promise<void> {
        if (!this.commonErrorElement || !this.validations || !this.commonParams) return;
        this.commonErrorElement.classList.remove('is-invalid');
        if (ValidationUtils.validateForm(this.validations)) {
            if (this.checkParamsToUpdate()) {
                // console.log(this.upd_data);
                let trans_id:number| null =this.commonParams.transId;
                if (!trans_id) return;
                // console.log(trans_id);
                const result:DefaultResponseType = await HttpUtils.request('/operations/' + trans_id, 'PUT', true, this.upd_data);
                if (result.error) {
                    this.commonErrorElement.classList.add('is-invalid');
                } else {
                    this.openNewRoute('/finance-pl');
                }
            } else {
                this.openNewRoute('/finance-pl');
            }
        } else {
            this.commonErrorElement.classList.add('is-invalid');
        }
    }

    public showParams():void {
        if (!this.dateElement || !this.commonParams || !this.amountElement || !this.commentElement) return;
        let ss:string|null;
        const dt:Date |null = (this.commonParams as CommonParams).tansIdData.date;
        if (!dt) return;
          this.dateElement.value = dt.toString();
        const rr:number|null = this.commonParams.tansIdData.amount;
        if (rr)  this.amountElement.value = rr.toString();
        ss = this.commonParams.tansIdData.comment;
        if (ss) this.commentElement.value = ss;
    }

   private  showCategories(ctgList:CtgListElement[]):void {
       if (!this.commonParams || !this.categoryElement)  return;
        let ctgElement:CtgListElement |null = null;
        const sel_ctg:number | null = this.commonParams.tansIdData.category_id;
        if (!sel_ctg)  return;
        for (let i = 0; i < ctgList.length; i++) {
            ctgElement = ctgList[i] as CtgListElement;
            if (ctgElement && ctgElement.id && ctgElement.title) {
                const optionElement = document.createElement('option');
                optionElement.innerText = ctgElement.title;
                optionElement.setAttribute('value', ctgElement.id.toString());
                if (sel_ctg === ctgElement.id) {
                    optionElement.setAttribute('selected', 'true')
                }
                this.categoryElement.appendChild(optionElement);
            }
        }
    }


    public async initial():Promise<void> {
        if (this.commonParams) {
            this.commonParams.setNavPl();
            if (await this.commonParams.reloadByTransId()) {
                if (await this.commonParams.reloadIncomeCategories()) {
                    this.commonParams.findCtgIdIncome();
                    this.showCategories(this.commonParams.categories.incomeCategories);
                    this.showParams();
                }
            }
        }
    }
}
