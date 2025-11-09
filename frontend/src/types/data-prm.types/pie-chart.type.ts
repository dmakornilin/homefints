import {Chart,PieController, ArcElement,Tooltip, Legend} from "chart.js";

export class PieChartRecord {
    public group: string;
    public amount:number;
    constructor (group:string,amount:number) {
        this.group = group;
        this.amount = amount;
    }
}


export class ChartParams {
    public incPie: Chart | null =null;
    public cstPie: Chart| null =null;
    private readonly incomeElement: HTMLElement | null =null;

    public incomeData: PieChartRecord[] | null = null;
    public costData: PieChartRecord[] | null = null;

    constructor(incElm: HTMLElement | null,incomeData: PieChartRecord[], cstElm: HTMLElement | null,costData: PieChartRecord[]) {
      if (!incElm) {return;}
      if (!cstElm) {return;}
      if (!incomeData || !costData) {return;}

        this.incomeElement = incElm;
        this.incomeData = incomeData;
        this.costData = costData;
         Chart.register(PieController,ArcElement,Tooltip,Legend);


         const dataIncome = {
             label: '',
             datasets: [{
                 label: '',
                 data: this.incomeData.map((row:PieChartRecord) => row.amount),
                 backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"]
             }]
         }

         const dataCost = {
             label: '',
             datasets: [{
                 label: '',
                 data: this.costData.map((row:PieChartRecord) => row.amount),
                 backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"]
             }]
         }

         const configIncome = {
             type: 'pie' as const,
             data: dataIncome,
             options: {
                 responsive: true,
             }
         }

         const configCost = {
             type: 'pie' as const,
             data: dataCost,
             options: {
                 responsive: true,
             }
         }
        this.incPie= new Chart(incElm as HTMLCanvasElement,configIncome);
        this.cstPie= new Chart(cstElm as HTMLCanvasElement,configCost);

    }

    public removeChartData(ch:Chart) {
        if (!ch.data.labels) return;
        while (ch.data.labels.length > 0) {
            ch.data.labels.pop();
            ch.data.datasets.forEach((dataset) => {
                dataset.data.pop();
            });
        }
    }

    public removeData(){
        if (this.incPie) this.removeChartData(this.incPie);
        if (this.cstPie) this.removeChartData(this.cstPie);
    }


    public updateData() {
        if (!this.incomeData || !this.costData) return;
        if (!this.incPie || !this.cstPie) return;


        this.removeChartData(this.incPie);
        for (let ii:number = 0; ii < this.incomeData.length; ii++) {
            let current_income = (this.incomeData[ii] as PieChartRecord);
            if (this.incPie.data.labels) {
                this.incPie.data.labels.push(current_income.group);
                    this.incPie.data.datasets.forEach((dataset) => {
                           dataset.data.push(current_income.amount);
                    });

            }
        }
        this.incPie.update();
        if (this.cstPie) this.removeChartData(this.cstPie);
        for (let ii:number = 0; ii < this.costData.length; ii++) {
            let current_cost = (this.costData[ii] as PieChartRecord);
            if (this.cstPie.data.labels) {
                this.cstPie.data.labels.push(current_cost.group);
                    this.cstPie.data.datasets.forEach((dataset) => {
                           dataset.data.push(current_cost.amount);
                    });

            }
        }
        this.cstPie.update();
    }

}
