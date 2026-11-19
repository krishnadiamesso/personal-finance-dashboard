import type { Transaction } from "../types/transaction.ts";

export interface MonthlySummary {
  month: string;
  income: number;
  expenses: number;
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
