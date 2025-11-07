export enum CategoryTypes {
    cost =   'expense',
    income = 'income'
}

export class CategorySwodRecord {
  public type:  CategoryTypes=CategoryTypes.cost;
  public date: string | null =null;
  public category_id: number | null =null;
  public  amount: number | null =null;
  public  comment:string|null  = null;
  constructor() {
  }

}