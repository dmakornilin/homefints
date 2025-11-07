import type { CtgListElement } from "../data-prm.types/dt-choice.types";
export type Categories = {
    incomeCategories: CtgListElement[];
    costCategories: CtgListElement[];
};
export type CurrentChoiceCtg = {
    currentCostCtg: number | null;
    costCategory: string | null;
    currentIncomeCtg: number | null;
    incomeCategory: string | null;
};
//# sourceMappingURL=current-choice.type.d.ts.map