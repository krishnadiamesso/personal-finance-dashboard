import type { ExpenseCategory, Transaction } from "../types/transaction.ts";

export interface MonthlySummary {
  month: string;
  income: number;
  expenses: number;
}

export interface CategorySummary {
  category: ExpenseCategory;
  total: number;
}

export function calculateMonthlySummary(transactions: Transaction[]): MonthlySummary[] {
  const summaries = new Map<string, MonthlySummary>();

  for (const transaction of transactions) {
    const month = transaction.date.slice(0, 7);

    let summary = summaries.get(month);

    if (!summary) {
      summary = {
        month,
        income: 0,
        expenses: 0,
      };

      summaries.set(month, summary);
    }

    if (transaction.type === "income") {
      summary.income += transaction.amount;
    } else {
      summary.expenses += transaction.amount;
    }
  }

  return Array.from(summaries.values()).sort((a, b) => a.month.localeCompare(b.month));
}

export function calculateSpendingByCategory(transactions: Transaction[]): CategorySummary[] {
  const expensesTransactions = transactions.filter((transaction) => transaction.type === "expense");

  const summaries = new Map<ExpenseCategory, number>();

  for (const transaction of expensesTransactions) {
    const category = transaction.category;

    const currentTotal = summaries.get(category) ?? 0;

    summaries.set(category, currentTotal + transaction.amount);
  }

  const result: CategorySummary[] = Array.from(summaries.entries()).map(([category, total]) => ({
    category,
    total,
  }));

  return result.sort((a, b) => b.total - a.total)
}
