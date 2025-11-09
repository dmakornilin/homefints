import { Chart } from "chart.js";
export declare class PieChartRecord {
    group: string;
    amount: number;
    constructor(group: string, amount: number);
}
export declare class ChartParams {
    incPie: Chart | null;
    cstPie: Chart | null;
    private readonly incomeElement;
    incomeData: PieChartRecord[] | null;
    costData: PieChartRecord[] | null;
    constructor(incElm: HTMLElement | null, incomeData: PieChartRecord[], cstElm: HTMLElement | null, costData: PieChartRecord[]);
    removeChartData(ch: Chart): void;
    removeData(): void;
    updateData(): void;
}
//# sourceMappingURL=pie-chart.type.d.ts.map