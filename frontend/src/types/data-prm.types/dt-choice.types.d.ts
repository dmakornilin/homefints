export declare enum ElmDtFlags {
    today = 0,
    week = 1,
    month = 2,
    year = 3,
    all = 4,
    period = 5
}
export declare enum FinTypeEnum {
    income = "income",
    cost = "cost"
}
export type DataTransElement = {
    id: number | null;
    date: Date | null;
    amount: number | null;
    category: string | null;
    comment: string | null;
    type: FinTypeEnum | null;
    category_id: number | null;
};
export type GroupSwodElement = {
    group: string;
    amount: number;
};
export type CtgListElement = {
    id: number;
    title: string;
};
export declare class CategoriesClass {
    incomeCategories: CtgListElement[];
    costCategories: CtgListElement[];
    constructor();
}
//# sourceMappingURL=dt-choice.types.d.ts.map