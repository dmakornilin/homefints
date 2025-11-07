export type DateStrVal = {
    txt: string;
    val: string;
};
export declare class DateElements {
    static elementToDate(element: string): Date | null;
    static dateToValText(dt: Date): DateStrVal;
    static current_date_rus(): string;
    static current_week_iso(): string | null;
    static current_date_iso(): string | null;
    static current_mes_iso(): string | null;
    static current_year_iso(): string | null;
    static stringRusdtTovalDt(value: string): string | null;
    static dtStrToString(dt: string): string | null;
}
//# sourceMappingURL=date-elemets.d.ts.map