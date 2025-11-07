import {AuthUtils} from "../../../utils/auth-util";
import {NumberUtils} from "../../../utils/number-utils";
import {DateElements} from "../../../utils/date-elemets";
import type {NewRouteFunction} from "../../../types/util-types/new-route.type";
import {CommonParams} from "../../../utils/common_params";
import {ChoiceDataModule} from "../../../utils/choice-data-module";
import {type DataTransElement, ElmDtFlags} from "../../../types/data-prm.types/dt-choice.types";
import {Config} from "../../../config/config";

export class FinancePl {
    private readonly openNewRoute: NewRouteFunction;
    public commonParams: CommonParams | undefined;
    private readonly tableElement: HTMLElement | null = null;
    private readonly removeBtnElement: HTMLElement | null = null;

    constructor(openNewRoute: NewRouteFunction, commonParams: CommonParams | undefined) {
        this.openNewRoute = openNewRoute;

        if (!AuthUtils.isLogin()) {
            this.openNewRoute('/login');
            return;
        }
        this.commonParams = commonParams;
        this.tableElement = document.getElementById('pl-table');
        this.removeBtnElement = document.getElementById('remove-button');
        if (this.removeBtnElement) {
            this.removeBtnElement.addEventListener('click', this.removeTransId.bind(this));
        }
        this.initial();
    }

    async removeTransId(event: Event): Promise<void> {
        if (!this.commonParams) {
            return
        }
        // console.log("removeTransId="+this.commonParams.transId);
        if (await this.commonParams.deleteTransAct()) {
            this.openNewRoute('/finance-pl');
        }
    }

    initial() {
        if (this.commonParams) {
            this.commonParams.setNavPl();
            let elm: HTMLElement | null;
            elm = document.getElementById('trans-flag-0');
            if (!elm) {
                return
            }

            this.commonParams.transactDataModule.flg0Element = (elm as HTMLInputElement);
            elm.addEventListener("click", this.setChoiceFlag.bind(this));

            elm = document.getElementById('trans-flag-1');
            if (!elm) {
                return
            }
            this.commonParams.transactDataModule.flg1Element = (elm as HTMLInputElement);
            elm.addEventListener("click", this.setChoiceFlag.bind(this));

            elm = document.getElementById('trans-flag-2');
            if (!elm) {
                return
            }
            this.commonParams.transactDataModule.flg2Element = (elm as HTMLInputElement);
            elm.addEventListener("click", this.setChoiceFlag.bind(this));

            elm = document.getElementById('trans-flag-3');
            if (!elm) {
                return
            }
            this.commonParams.transactDataModule.flg3Element = (elm as HTMLInputElement);
            elm.addEventListener("click", this.setChoiceFlag.bind(this));

            elm = document.getElementById('trans-flag-4');
            if (!elm) {
                return
            }
            this.commonParams.transactDataModule.flg4Element = (elm as HTMLInputElement);
            elm.addEventListener("click", this.setChoiceFlag.bind(this));

            elm = document.getElementById('trans-flag-5');
            if (!elm) {
                return
            }
            this.commonParams.transactDataModule.flg5Element = (elm as HTMLInputElement);
            elm.addEventListener("click", this.setChoiceFlag.bind(this));

            elm = document.getElementById('trans-date-from');
            if (!elm) {
                return
            }
            this.commonParams.transactDataModule.dFromElement = (elm as HTMLInputElement);
            elm = document.getElementById('trans-date-to');
            if (!elm) {
                return
            }
            this.commonParams.transactDataModule.dToElement = (elm as HTMLInputElement);
            this.commonParams.transactDataModule.is_dtl = true;
            this.commonParams.transactDataModule.initial();

        }
    }

    public async setChoiceFlag(element: any): Promise<void> {
        if (!this.commonParams) {
            return
        }
        const param: ChoiceDataModule = this.commonParams.transactDataModule;
        const ss: string | null = element.getAttribute('choice-flag')
        if (!ss) return;
        const flg: number = parseInt(ss);
        param.flag = flg;
        let result: boolean = false;
        if (flg === 0) {
            param.flag = ElmDtFlags.today;
            param.setChoiceFlag();
            result = true;
        }
        if (flg === 1) {
            param.flag = ElmDtFlags.week;
            param.setChoiceFlag();
            result = true;
        }
        if (flg === 2) {
            param.flag = ElmDtFlags.month;
            param.setChoiceFlag();
            result = true;
        }
        if (flg === 3) {
            param.flag = ElmDtFlags.year;
            param.setChoiceFlag();
            result = true;
        }
        if (flg === 4) {
            param.flag = ElmDtFlags.all;
            param.setChoiceFlag();
            result = true;
        }
        if (flg === 5) {
            param.flag = ElmDtFlags.period;
            param.setChoiceFlag();
            result = true;
        }
        if (!result) {
            return
        }
        if (await param.reloadOperations()) {
            this.showOperations(param.dataTrans);
        }
    }

    private toChoiceTransAct(element: any): void {
        const ss: string | null = element.getAttribute('id-transact');
        if (!ss) return;
        if (!this.commonParams) {
            return
        }
        // console.log(idTans);
        this.commonParams.transId = parseInt(ss);
    }

    private showOperations(operList: DataTransElement[]): void {
        let current = null;
        let ii: number = 0;
        if (this.tableElement) {
            while (this.tableElement.firstChild) {
                this.tableElement.removeChild(this.tableElement.firstChild);
            }

            if (operList.length >= 1) {
                const captHeadElement = document.createElement('thead');
                const captTrElement = document.createElement('tr');

                let captTh1Element = document.createElement('th');
                captTh1Element.className = "col-2";
                let captTh1H5Element = document.createElement('h5');
                captTh1H5Element.innerText = '№ операции';
                captTh1Element.appendChild(captTh1H5Element);
                captTrElement.appendChild(captTh1Element);

                captTh1Element = document.createElement('th');
                captTh1Element.className = "col-2";
                captTh1H5Element = document.createElement('h5');
                captTh1H5Element.innerText = 'Тип';
                captTh1Element.appendChild(captTh1H5Element);
                captTrElement.appendChild(captTh1Element);

                captTh1Element = document.createElement('th');
                captTh1Element.className = "col-2";
                captTh1H5Element = document.createElement('h5');
                captTh1H5Element.innerText = 'Категория';
                captTh1Element.appendChild(captTh1H5Element);
                captTrElement.appendChild(captTh1Element);

                captTh1Element = document.createElement('th');
                captTh1Element.className = "col-2";
                captTh1H5Element = document.createElement('h5');
                captTh1H5Element.innerText = 'Сумма';
                captTh1Element.appendChild(captTh1H5Element);
                captTrElement.appendChild(captTh1Element);

                captTh1Element = document.createElement('th');
                captTh1Element.className = "col-2";
                captTh1H5Element = document.createElement('h5');
                captTh1H5Element.innerText = 'Дата';
                captTh1Element.appendChild(captTh1H5Element);
                captTrElement.appendChild(captTh1Element);

                captTh1Element = document.createElement('th');
                captTh1Element.className = "col-2";
                captTh1H5Element = document.createElement('h5');
                captTh1H5Element.innerText = 'Комментарий';
                captTh1Element.appendChild(captTh1H5Element);
                captTrElement.appendChild(captTh1Element);

                captHeadElement.appendChild(captTrElement);
                this.tableElement.appendChild(captHeadElement);
            }
            for (let i: number = operList.length - 1; i >= 0; i--) {
                current = operList[i];
                if (current) {
                    // console.log(current);
                    const trElement = document.createElement('tr');
                    ii++;
                    const td1Element = document.createElement('td');
                    td1Element.innerText = ii.toString();
                    trElement.appendChild(td1Element);
                    const tdTypeElement = document.createElement('td');
                    if (current.type === Config.costKey) {
                        tdTypeElement.innerText = 'расход';
                        tdTypeElement.classList.add('text-danger');
                    }
                    if (current.type === Config.incomeKey) {
                        tdTypeElement.innerText = 'доход';
                        tdTypeElement.className = 'text-success';
                    }
                    trElement.appendChild(tdTypeElement);

                    const tdCategoryElement = document.createElement('td');
                    if (current.category) {
                        tdCategoryElement.innerText = current.category;
                    }
                    trElement.appendChild(tdCategoryElement);
                    const tdSumElement = document.createElement('td');
                    if (current && current.amount) {
                        tdSumElement.innerText = NumberUtils.numberToStringWithThDiv(current.amount) + '$';
                    }
                    trElement.appendChild(tdSumElement);
                    const tdDataElement = document.createElement('td');
                    const ss: string | null = DateElements.dtStrToString(String(current.date));
                    if (current.date && ss) {
                        tdDataElement.innerText = ss;
                    }
                    trElement.appendChild(tdDataElement);

                    const tdDscElement = document.createElement('td');
                    if (current.comment) {
                        tdDscElement.innerText = current.comment;
                    }
                    trElement.appendChild(tdDscElement);

                    const tdActionsElement = document.createElement('td');
                    const divActionsElement = document.createElement('div');
                    divActionsElement.className = 'd-flex';
                    const removeElement = document.createElement('button');
                    removeElement.classList.add('border-0');
                    removeElement.classList.add('bg-transparent');
                    removeElement.setAttribute('type', 'button');
                    removeElement.setAttribute('data-bs-toggle', 'modal');
                    removeElement.setAttribute('data-bs-target', '#removeTransact');
                    const removeIaElement = document.createElement('ia');
                    removeIaElement.className = 'fa fa-trash';
                      let nn: number | null;
                      nn=current.id;
                      if (nn) {removeIaElement.setAttribute('id-transact', nn.toString());}
                    removeIaElement.addEventListener('click', this.toChoiceTransAct.bind(this));

                    removeElement.appendChild(removeIaElement);
                    divActionsElement.appendChild(removeElement);

                    const hrefEditElement = document.createElement('a');

                    if (current.type === Config.incomeKey) {
                        hrefEditElement.href = '/finance-pl/edit-income';
                    } else {
                        hrefEditElement.href = '/finance-pl/edit-cost';
                    }
                    hrefEditElement.className = 'mx-2';
                    const editIaElement = document.createElement('ia');
                    editIaElement.className = 'fa fa-pencil';
                       nn=current.id;
                    if (nn) {editIaElement.setAttribute('id-transact', nn.toString());}
                    editIaElement.addEventListener('click', this.toChoiceTransAct.bind(this));

                    hrefEditElement.appendChild(editIaElement);
                    divActionsElement.appendChild(hrefEditElement);
                    tdActionsElement.appendChild(divActionsElement);
                    trElement.appendChild(tdActionsElement);
                    this.tableElement.appendChild(trElement);

                }
            }
        }

    }
}
