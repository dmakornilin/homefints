import {ValidationUtils} from "../../../utils/validation-utils";
import {AuthUtils} from "../../../utils/auth-util";
import {HttpUtils} from "../../../utils/http-utils";
import type {NewRouteFunction} from "../../../types/util-types/new-route.type";
import {CommonParams} from "../../../utils/common_params";
import type {ValidationElement} from "../../../types/html-service.types/validation.types";
import type {DefaultResponseType} from "../../../types/respose.types/default-response.type";
import type {NaveElmType} from "../../../types/html-service.types/nave-elm.type";

export class AddCostCategory {
    private readonly openNewRoute:NewRouteFunction;
    public commonParams:CommonParams | undefined;
    private readonly categoryName:HTMLInputElement | null = null;
    private readonly validations: ValidationElement[] | null = null;

    constructor(openNewRoute:NewRouteFunction, commonParams:CommonParams | undefined) {
        this.openNewRoute = openNewRoute;
        if (!AuthUtils.isLogin()) {
            this.openNewRoute('/login');
        } else {
            this.commonParams = commonParams;
            this.initial();
              let elm:HTMLElement |null;
              elm=document.getElementById("add-name");
            if (elm) {this.categoryName = elm as HTMLInputElement; }
            if (this.categoryName) {
            this.validations = [
                {element: this.categoryName}
            ] }
            elm=document.getElementById("create-category");
            if (elm) { elm.addEventListener("click", this.addCategory.bind(this)); }
        }
    }

    private async addCategory(): Promise<void> {
        if (!this.validations || !this.categoryName) { return }
        if (ValidationUtils.validateForm(this.validations)) {
            // console.log('Прошел валидацию');
            const result:DefaultResponseType  = await HttpUtils.request('/categories/expense', 'POST', true,
                { title: this.categoryName.value });
            if (result.error) {
                this.categoryName.classList.add('is-invalid');
                return;
            } else {
                this.openNewRoute('/costs');
            }
        }
    }

    private initial() {
        const com_prm:CommonParams | undefined= this.commonParams;
        if (!com_prm) { return; }
        if (!com_prm.hasOwnProperty("navElements")) { return; }
        const navs: NaveElmType | null = com_prm.navElements;
        if (!navs) { return; }
        if (!navs.hasOwnProperty("incomeNavBottom")) { return; }
            com_prm.setCtgCost();
        (navs.incomeNavBottom as HTMLElement).dispatchEvent(new Event('click'))
    }


}
