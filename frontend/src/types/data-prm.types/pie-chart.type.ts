import {Chart,type ChartDataset} from '../../../node_modules/chart.js/dist/types';


export class PieChartRecord {
    public group: string;
    public amount:number;
    constructor (group:string,amount:number) {
        this.group = group;
        this.amount = amount;
    }
}


export class ChartParams {
    public incPie: Chart;
    public cstPie: Chart;
    private readonly incomeElement: any;
    private readonly costElement: any;

    public incomeData: PieChartRecord[];
    public costData: PieChartRecord[];

    constructor(incElm: any,incomeData: PieChartRecord[], cstElm: any,costData: PieChartRecord[]) {
        this.incomeElement = incElm;
        this.costElement = cstElm;
        this.incomeData = incomeData;
        this.costData = costData;


        this.incPie = new Chart(
            this.incomeElement,
            {
                type: 'pie',
                data: {
                    labels: this.incomeData.map( (row:PieChartRecord) => row.group),
                    datasets: [
                        {
                            label: '',
                            data: this.incomeData.map((row:PieChartRecord) => row.amount),
                            backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"]
                        }
                    ]
                }
            }
        );

        this.cstPie = new Chart(
            this.costElement,
            {
                type: 'pie',
                data: {
                    labels: this.costData.map((row:PieChartRecord)  => row.group),
                    datasets: [
                        {
                            label: '',
                            data: this.costData.map((row:PieChartRecord)  => row.amount),
                            backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"]
                        }
                    ]
                }
            }
        );
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
        if (this.incPie) this.removeChartData(this.incPie);
        for (let ii = 0; ii < this.incomeData.length; ii++) {
        //     this.pieAddData(this.pieCharts.incPie, this.income[ii].group, this.income[ii].amount);
            if (this.incPie.data.labels) {
                this.incPie.data.labels.push((this.incomeData[ii] as PieChartRecord).group);
                    this.incPie.data.datasets.forEach((dataset:ChartDataset) => {
                        dataset.data.push((this.incomeData[ii] as PieChartRecord).amount);
                    });

            }
        }
        this.incPie.update();

        if (this.cstPie) this.removeChartData(this.cstPie);
        for (let ii = 0; ii < this.costData.length; ii++) {
            if (this.cstPie.data.labels) {
                this.cstPie.data.labels.push((this.costData[ii] as PieChartRecord).group);
                    this.cstPie.data.datasets.forEach((dataset:ChartDataset) => {
                        dataset.data.push((this.costData[ii] as PieChartRecord).amount);
                    });

            }
        }
        this.cstPie.update();

    }

}
