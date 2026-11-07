import type { Transaction } from "../types/transaction.ts";

export function calculateTotalIncome(transactions: Transaction[]): number {
  const incomeTransactions = transactions.filter((transaction) => transaction.type === "income");
  return incomeTransactions.reduce((total, transaction) => total + transaction.amount, 0);
}

export function calculateTotalExpenses(transactions: Transaction[]): number {
  const expenseTransactions = transactions.filter((transaction) => transaction.type === "expense");
  return expenseTransactions.reduce((total, transaction) => total + transaction.amount, 0);
}

export function calculateBalance(transactions: Transaction[]): number {
  return calculateTotalIncome(transactions) - calculateTotalExpenses(transactions);
}

export function calculateSavingsRate(transactions: Transaction[]): number {
  const income = calculateTotalIncome(transactions)

  if (income === 0) return 0

  return (calculateBalance(transactions) / income) * 100;
}
