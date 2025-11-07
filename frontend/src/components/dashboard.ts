import {AuthUtils} from "../utils/auth-util";
import type {NewRouteFunction} from "../types/util-types/new-route.type";
import {CommonParams} from "../utils/common_params";
import {ChartParams, PieChartRecord} from "../types/data-prm.types/pie-chart.type";
import type {ChoiceDataModule} from "../utils/choice-data-module";
import {ElmDtFlags} from "../types/data-prm.types/dt-choice.types";
// import React from "react";

export class Dashboard {
    private readonly openNewRoute: NewRouteFunction;
    public commonParams: CommonParams | undefined;
    private iniFlg:boolean = false;
    private income:PieChartRecord[] = [];
    private cost:PieChartRecord[] = [];
    private readonly pieCharts:ChartParams | undefined;

    constructor(openNewRoute:NewRouteFunction, commonParams:CommonParams | undefined) {
        this.openNewRoute = openNewRoute;
        if (!AuthUtils.isLogin()) {
            this.openNewRoute('/login');
        } else {
            this.commonParams = commonParams;
            if (!this.commonParams) return;
                let elm:HTMLElement | null = document.getElementById('gl-flag-0');
                if (!elm) return;
            this.commonParams.glDataModule.flg0Element = elm as HTMLInputElement;
                elm= document.getElementById('gl-flag-1');
            if (!elm) return;
            this.commonParams.glDataModule.flg1Element = elm as HTMLInputElement;
                elm= document.getElementById('gl-flag-2');
            if (!elm) return;
            this.commonParams.glDataModule.flg2Element = elm as HTMLInputElement;
                elm= document.getElementById('gl-flag-3');
            if (!elm) return;
            this.commonParams.glDataModule.flg3Element = elm as HTMLInputElement;
                elm= document.getElementById('gl-flag-4');
            if (!elm) return;
            this.commonParams.glDataModule.flg4Element = elm as HTMLInputElement;
                elm=document.getElementById('gl-flag-5');
            if (!elm) return;
            this.commonParams.glDataModule.flg5Element = elm as HTMLInputElement;
                elm= document.getElementById('gl-date-from');
            if (!elm) return;
            this.commonParams.glDataModule.dFromElement = elm as HTMLInputElement;
                elm= document.getElementById('gl-date-to');
            if (!elm) return;
            this.commonParams.glDataModule.dToElement = elm as HTMLInputElement;
            this.commonParams.glDataModule.initial();

            this.pieCharts = new ChartParams(document.getElementById('income-pie'),this.income,document.getElementById('cost-pie'),this.cost);
            this.iniFlg = false;

            this.initial();
        }

    }


    async setChoiceFlag(event:any) {
        if (!this.pieCharts || !this.commonParams) return;
        const param:ChoiceDataModule = this.commonParams.transactDataModule;
        const ss:string|null =(event.srcElement.getAttribute('choice-flag'));
           if (!ss) return;
        const flg = parseInt(ss);
        if (flg === 0) {param.flag = ElmDtFlags.today; param.setChoiceFlag();  }
        if (flg === 1) {param.flag = ElmDtFlags.week; param.setChoiceFlag();  }
        if (flg === 2) {param.flag = ElmDtFlags.month; param.setChoiceFlag();  }
        if (flg === 3) {param.flag = ElmDtFlags.year; param.setChoiceFlag();  }
        if (flg === 4) {param.flag = ElmDtFlags.all; param.setChoiceFlag();  }
        if (flg === 5) {param.flag = ElmDtFlags.period; param.setChoiceFlag();  }
        if (await param.reloadOperations()) {
            param.toGroup2arr(this.income, this.cost);
            if (this.iniFlg) { this.pieCharts.updateData() }
        }
    }


    private async initial():Promise<void> {
        if (this.commonParams) {
            this.commonParams.setNavMain();

            let elm:HTMLElement | null = document.getElementById('gl-flag-0');
               if (!elm) return;
            this.commonParams.transactDataModule.flg0Element = elm as HTMLInputElement;
            elm.addEventListener("click", this.setChoiceFlag.bind(this));

            elm = document.getElementById('gl-flag-1');
            if (!elm) return;
            this.commonParams.transactDataModule.flg1Element = elm as HTMLInputElement;
            elm.addEventListener("click", this.setChoiceFlag.bind(this));

            elm = document.getElementById('gl-flag-2');
            if (!elm) return;
            this.commonParams.transactDataModule.flg2Element = elm as HTMLInputElement;
            elm.addEventListener("click", this.setChoiceFlag.bind(this));

            elm = document.getElementById('gl-flag-3');
            if (!elm) return;
            this.commonParams.transactDataModule.flg3Element = elm as HTMLInputElement;
            elm.addEventListener("click", this.setChoiceFlag.bind(this));

            elm = document.getElementById('gl-flag-4');
            if (!elm) return;
            this.commonParams.transactDataModule.flg4Element = elm as HTMLInputElement;
            elm.addEventListener("click", this.setChoiceFlag.bind(this));

            elm = document.getElementById('gl-flag-5');
            if (!elm) return;
            this.commonParams.transactDataModule.flg5Element = elm as HTMLInputElement;
            elm.addEventListener("click", this.setChoiceFlag.bind(this));

            elm= document.getElementById('gl-date-from');
            if (!elm) return;
            this.commonParams.transactDataModule.dFromElement = elm as HTMLInputElement;
            elm= document.getElementById('gl-date-to');
            if (!elm) return;
            this.commonParams.transactDataModule.dToElement = elm as HTMLInputElement;
            this.commonParams.transactDataModule.is_dtl = true;
            await this.commonParams.transactDataModule.initial();
            // await this.iniPi().then();
            this.iniFlg = true;
        }
    }
}