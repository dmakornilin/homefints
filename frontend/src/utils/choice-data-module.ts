import {ValidationUtils} from "./validation-utils";
import {HttpUtils} from "./http-utils";
import {DateElements} from "./date-elemets";
import {
    type DataTransElement,
    ElmDtFlags,
    FinTypeEnum,
    type GroupSwodElement
} from "../types/data-prm.types/dt-choice.types";
import type {ValidationElement} from "../types/html-service.types/validation.types";


export class ChoiceDataModule {

    public flag: ElmDtFlags | null = null;
    public is_dtl: boolean = false;
    public flg0Element: HTMLInputElement | null = null;
    public flg1Element: HTMLInputElement | null = null;
    public flg2Element: HTMLInputElement | null = null;
    public flg3Element: HTMLInputElement | null = null;
    public flg4Element: HTMLInputElement | null = null;
    public flg5Element: HTMLInputElement | null = null;
    public dFromElement: HTMLInputElement | null = null;
    public dToElement: HTMLInputElement | null = null;
    public validations: ValidationElement[] = [];
    public dataTrans: DataTransElement[] = [];


    constructor() {
    }

    toGroup2arr(incArray: GroupSwodElement[], costArray: GroupSwodElement[]) {
        // на всякий случай очищаю массивы от предыдущих выборок
        while (incArray.length > 0) {
            incArray.pop();
        }
        while (costArray.length > 0) {
            costArray.pop();
        }
        let elm: DataTransElement | null = null;
        let result: boolean = false;
        let rr: number = 0;
        for (let i: number = 0; i < this.dataTrans.length; i++) {
            elm = (this.dataTrans[i] as DataTransElement);

            if (elm.type && elm.amount && elm.category) {
                if ((elm.type as FinTypeEnum) === FinTypeEnum.income) {
                    result = false;
                    for (let j: number = 0; j < incArray.length; j++) {
                        if ((incArray[j] as GroupSwodElement).group === elm.category) {
                            rr = (incArray[j] as GroupSwodElement).amount + elm.amount;
                            (incArray[j] as GroupSwodElement).amount = rr;
                            result = true;
                        }
                    }
                    if (!result) {
                        incArray.push({group: elm.category, amount: elm.amount})
                    }
                } else {
                    result = false;
                    for (let j: number = 0; j < costArray.length; j++) {
                        if ((costArray[j] as GroupSwodElement).group === elm.category) {
                            rr = (costArray[j] as GroupSwodElement).amount + elm.amount;
                            (costArray[j] as GroupSwodElement).amount = rr;
                            result = true;
                        }
                    }
                    if (!result) {
                        costArray.push({group: elm.category, amount: elm.amount})
                    }
                }
            }
        }
    }


    public sbrosChoce(): void {
        if (this.flg0Element) {
            this.flg0Element.classList.remove('btn-secondary')
        }
        if (this.flg1Element) {
            this.flg1Element.classList.remove('btn-secondary')
        }
        if (this.flg2Element) {
            this.flg2Element.classList.remove('btn-secondary')
        }
        if (this.flg3Element) {
            this.flg3Element.classList.remove('btn-secondary')
        }
        if (this.flg4Element) {
            this.flg4Element.classList.remove('btn-secondary')
        }
        if (this.flg5Element) {
            this.flg5Element.classList.remove('btn-secondary')
        }
    }

    private sbrosValidationFlag(): void {
        if (this.dFromElement) {
            this.dFromElement.classList.remove('is-invalid')
        }
        if (this.dToElement) {
            this.dToElement.classList.remove('is-invalid')
        }
    }

    public setChoiceFlag(): void {
        this.sbrosChoce();
        this.sbrosValidationFlag();
        if (this.flag===null  ) {
            return
        }

        let tek_flag : ElmDtFlags  = this.flag;


        if ((tek_flag as ElmDtFlags) === ElmDtFlags.today) {
            if (this.flg0Element) {
                this.flg0Element.classList.add('btn-secondary');
            }
        }
        if ((tek_flag as ElmDtFlags) === ElmDtFlags.week) {
            if (this.flg1Element) {
                this.flg1Element.classList.add('btn-secondary');
            }
        }
        if ((tek_flag as ElmDtFlags) === ElmDtFlags.month) {
            if (this.flg2Element) {
                this.flg2Element.classList.add('btn-secondary');
            }
        }

        if ((tek_flag as ElmDtFlags) === ElmDtFlags.year) {
            if (this.flg3Element) {
                this.flg3Element.classList.add('btn-secondary');
            }
        }

        if ((tek_flag as ElmDtFlags) === ElmDtFlags.all) {
            if (this.flg4Element) {
                this.flg4Element.classList.add('btn-secondary');
            }
        }

        if ((tek_flag as ElmDtFlags) === ElmDtFlags.period) {
            if (this.flg5Element) {
                this.flg5Element.classList.add('btn-secondary');
            }
        }
    }

    public validate(): boolean {
        let result: boolean = true;
        if (this.flag === ElmDtFlags.period) {
            result = ValidationUtils.validateForm(this.validations);
        }
        return result;
    }

    refreshTransact(resp:DataTransElement[]) {
        while (this.dataTrans.length > 0) {
            this.dataTrans.pop();
        }
        for (let i = 0; i < resp.length; i++) {
            this.dataTrans.push((resp[i] as DataTransElement));
        }
    }

    public async reloadOperations(): Promise<boolean> {
        if (this.flag===null) {
            return false
        }
        let tek_flag: ElmDtFlags = this.flag;

        if (this.validate() && this.is_dtl) {
            if ((tek_flag as ElmDtFlags) === ElmDtFlags.all) {
                const result = await HttpUtils.request('/operations/?period=all');
                if (!result.error && result.response) {
                    this.refreshTransact(result.response);
                    return true;
                }
            }
            if ((tek_flag as ElmDtFlags) === ElmDtFlags.week) {
                const result = await HttpUtils.request('/operations/?period=week');
                if (!result.error && result.response) {
                    this.refreshTransact(result.response);
                    return true;
                }
            }
            if ((tek_flag as ElmDtFlags) === ElmDtFlags.month) {
                const result = await HttpUtils.request('/operations/?period=month');
                if (!result.error && result.response) {
                    this.refreshTransact(result.response);
                    return true;
                }
            }
            if ((tek_flag as ElmDtFlags) === ElmDtFlags.year) {
                const result = await HttpUtils.request('/operations/?period=year');
                if (!result.error && result.response) {
                    this.refreshTransact(result.response);
                    return true;
                }
            }
            if ((tek_flag as ElmDtFlags) === ElmDtFlags.today) {
                let s0: string | null = DateElements.current_date_rus();
                if (s0) {
                    const result = await HttpUtils.request('/operations/?period=interval&dateFrom=' + s0 + '&dateTo=' + s0);
                    if (!result.error && result.response) {
                        this.refreshTransact(result.response);
                        return true;
                    }
                }
            }
            if ((tek_flag as ElmDtFlags) === ElmDtFlags.period) {
                if (this.dFromElement && this.dToElement) {
                    let s0: string | null = this.dFromElement.value;
                    if (s0) {
                        let s1: string | null = this.dToElement.value;
                        if (s1) {
                            const result = await HttpUtils.request('/operations/?period=interval&dateFrom=' + s0 + '&dateTo=' + s1);
                            if (!result.error && result.response) { this.refreshTransact(result.response);  return true; }
                            }
                        }
                    }
                }
            }
    return  false;
};


public initial(): void {
    this.sbrosChoce();
    this.sbrosValidationFlag();

    if(this.dFromElement && this.dToElement
)
{
    this.validations = [
        {'element': this.dFromElement},
        {'element': this.dToElement}
    ];
}
if (this.flg4Element) {
    this.flg4Element.click();
}
}

}