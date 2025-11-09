import {AuthUtils} from "../../utils/auth-util";
import {HttpUtils} from "../../utils/http-utils";
import type {NewRouteFunction} from "../../types/util-types/new-route.type";
import {CommonParams} from "../../utils/common_params";
import type {CtgListElement} from "../../types/data-prm.types/dt-choice.types";
import type {DefaultResponseType} from "../../types/respose.types/default-response.type";

export class Costs {
    private readonly openNewRoute: NewRouteFunction;
    public commonParams: CommonParams | undefined;
    private readonly ctgContainer:HTMLElement| null=null;

    constructor(openNewRoute:NewRouteFunction, commonParams:CommonParams | undefined) {
        this.openNewRoute = openNewRoute;

        if (AuthUtils.isLogin()) {
            this.commonParams = commonParams;
               let elm: HTMLElement | null = document.getElementById("category-container");
               if (!elm) return;
            this.ctgContainer = elm;
                elm=document.getElementById("to-delete-category");
            if (!elm) return;
            elm.addEventListener("click", this.choiceDelCategory.bind(this));

            this.initial();
            this.loadData();
            return;
        } else { this.openNewRoute('/login');  }
    }

    private initial():void {
        if (this.commonParams) {
            this.commonParams.setCtgCost();
            if (this.commonParams.navElements)
                (this.commonParams.navElements.incomeNavBottom as HTMLElement).dispatchEvent(new Event('click'));
        }
    }

    private showCategories(ctgList:CtgListElement[]) {
        if (!this.ctgContainer) return;
        let ctgElement:CtgListElement |null = null;
        for (let i:number = ctgList.length - 1; i >= 0; i--) {
            // if (i === 1) {
            ctgElement = ctgList[i] as CtgListElement;
            if (ctgElement.id && ctgElement.title) {
                const currentColElement = document.createElement('div');
                currentColElement.className = 'col';
                const div1Element = document.createElement('div');
                div1Element.classList.add('card');
                div1Element.classList.add('mb-4');
                div1Element.classList.add('rounded-3');
                div1Element.classList.add('pad-top-20');
                div1Element.classList.add('group-block-height');

                currentColElement.appendChild(div1Element);
                const h4Element = document.createElement('h4');
                h4Element.classList.add('my-0');
                h4Element.classList.add('fw-normal');
                h4Element.classList.add('text-group-color');
                h4Element.classList.add('left-20');

                h4Element.innerText = ctgElement.title;
                div1Element.appendChild(h4Element);

                const divFlexElement = document.createElement('div');
                divFlexElement.classList.add('d-flex');
                divFlexElement.classList.add('pad-top-10');
                divFlexElement.classList.add('gap-2');
                divFlexElement.classList.add('left-20');
                div1Element.appendChild(divFlexElement);

                const hrefEditElement = document.createElement('span');
                // hrefEditElement.href ='/cost/edit';
                hrefEditElement.classList.add('btn');
                hrefEditElement.classList.add('btn-block');
                hrefEditElement.classList.add('btn-primary');
                hrefEditElement.innerText = 'Редактировать';
                hrefEditElement.setAttribute('choice-ctg-id', ctgElement.id.toString());
                hrefEditElement.setAttribute('choice-ctg-name', ctgElement.title);
                hrefEditElement.addEventListener('click', this.toEditCategory.bind(this));

                divFlexElement.appendChild(hrefEditElement);

                const btnDelElement = document.createElement('button');
                btnDelElement.type = 'button';
                btnDelElement.classList.add('btn');
                btnDelElement.classList.add('btn-danger');
                btnDelElement.setAttribute('data-bs-toggle', 'modal');
                btnDelElement.setAttribute('data-bs-target', '#removeGroup');
                btnDelElement.setAttribute('choice-ctg-id', ctgElement.id.toString());
                btnDelElement.setAttribute('choice-ctg-name', ctgElement.title);
                btnDelElement.innerText = 'Удалить';
                btnDelElement.addEventListener('click', this.toDeleteCategory.bind(this));
                divFlexElement.appendChild(btnDelElement);

                this.ctgContainer.prepend(currentColElement);
            }
        }
    }


    private toDeleteCategory(e:PointerEvent):void {
        // @ts-ignore
        const choiceCtg:string | undefined = (e.srcElement as HTMLElement).getAttribute('choice-ctg-id');
            if (!choiceCtg) return;
        // @ts-ignore
        const choiceCtgName:string | undefined = (e.srcElement as HTMLElement).getAttribute('choice-ctg-name');
           if (!choiceCtgName) return;
        if (choiceCtg && this.commonParams) {
            this.commonParams.currents.currentCostCtg =  parseInt(choiceCtg);
            this.commonParams.currents.costCategory = choiceCtgName;
        }
    }

    async choiceDelCategory(e:PointerEvent):Promise<void> {
        if (this.commonParams) {
            const result:DefaultResponseType = await HttpUtils.request('/categories/expense/' + this.commonParams.currents.currentCostCtg, 'DELETE');
            if (!result.error) { await this.openNewRoute('/costs'); }
        }
    }

    toEditCategory(e:PointerEvent) {
 // console.log('target')
 //        console.log(e.target);
 // console.log(e.target);
    // @ts-ignore
        const choiceCtg:string | undefined = (e.srcElement as HTMLElement).getAttribute('choice-ctg-id');
        // @ts-ignore
        const choiceCtgName:string | undefined = (e.srcElement as HTMLElement).getAttribute('choice-ctg-name');

        if (choiceCtg && choiceCtgName && this.commonParams && this.commonParams.currents) {
            this.commonParams.currents.currentCostCtg =  parseInt(choiceCtg);
            this.commonParams.currents.costCategory = choiceCtgName;
                // console.log(this.commonParams.currents.costCategory);
            this.openNewRoute('/cost/edit');
        }
    }


    public async loadData():Promise<void> {
        if (!this.commonParams) return;
        await this.commonParams.reloadCostCategories();
        await this.showCategories(this.commonParams.categories.costCategories);

    }
}


