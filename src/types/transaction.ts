export type IncomeCategory = "salary" | "freelance" | "investment" | "gift" | "other";

export type ExpenseCategory =
  | "food"
  | "housing"
  | "transportation"
  | "utilities"
  | "entertainment"
  | "health"
  | "shopping"
  | "other";

interface BaseTransaction {
  id: string;
  description: string;
  amount: number;
  date: string;
}

export interface IncomeTransaction extends BaseTransaction {
  type: "income";
  category: IncomeCategory;
}

export interface ExpenseTransaction extends BaseTransaction {
  type: "expense";
  category: ExpenseCategory;
}

export type Transaction = IncomeTransaction | ExpenseTransaction;

export type TransactionCategory = Transaction["category"];

export type TransactionType = Transaction["type"];
