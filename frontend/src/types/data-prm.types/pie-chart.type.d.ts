import { Chart } from '../../../node_modules/chart.js/dist/types';
export declare class PieChartRecord {
    group: string;
    amount: number;
    constructor(group: string, amount: number);
}
export declare class ChartParams {
    incPie: Chart;
    cstPie: Chart;
    private readonly incomeElement;
    private readonly costElement;
    incomeData: PieChartRecord[];
    costData: PieChartRecord[];
    constructor(incElm: any, incomeData: PieChartRecord[], cstElm: any, costData: PieChartRecord[]);
    removeChartData(ch: Chart): void;
    removeData(): void;
    updateData(): void;
}
//# sourceMappingURL=pie-chart.type.d.ts.map