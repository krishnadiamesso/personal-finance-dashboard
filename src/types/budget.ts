import type { ExpenseCategory } from "./transaction.ts";

export interface Budget {
  id: string;
  category: ExpenseCategory;
  limit: number;
  month: string;
}
