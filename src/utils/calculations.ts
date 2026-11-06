import type { Transaction } from "../types/transaction.ts";

export function calculateTotalIncome(transactions: Transaction[]): number {
  const incomeTransactions = transactions.filter((transaction) => transaction.type === "income");
  return incomeTransactions.reduce((total, transaction) => total + transaction.amount, 0);
}
