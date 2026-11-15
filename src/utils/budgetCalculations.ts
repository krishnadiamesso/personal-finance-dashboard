import type { Transaction } from "../types/transaction.ts";
import type { Budget } from "../types/budget.ts";

export function calculateBudgetSpent(budget: Budget, transactions: Transaction[]): number {
  const budgetTransactions = transactions.filter(
    (transaction) =>
      transaction.type === "expense" &&
      transaction.category === budget.category &&
      transaction.date.slice(0, 7) === budget.month,
  );

  return budgetTransactions.reduce((total, transaction) => total + transaction.amount, 0);
}

export function calculateBudgetRemaining(budget: Budget, transactions: Transaction[]): number {
  const amountSpent = calculateBudgetSpent(budget, transactions);
  return budget.limit - amountSpent;
}

export function calculateBudgetPercentage(budget: Budget, transactions: Transaction[]): number {
  const limit = budget.limit;
  if (limit <= 0) return 0;
  const amountSpent = calculateBudgetSpent(budget, transactions);

  return (amountSpent / limit) * 100;
}
