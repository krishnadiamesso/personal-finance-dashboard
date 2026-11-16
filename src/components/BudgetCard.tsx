import type { Budget } from "../types/budget.ts";
import type { Transaction } from "../types/transaction.ts";
import { formatCurrency } from "../utils/currency.ts";
import {
  calculateBudgetPercentage,
  calculateBudgetRemaining,
  calculateBudgetSpent,
} from "../utils/budgetCalculations.ts";
import { Pencil, Trash2 } from "lucide-react";

interface BudgetCardProps {
  budget: Budget;
  transactions: Transaction[];
  onEditBudget?: (budget: Budget) => void;
  onDeleteBudget?: (budget: Budget) => void;
}

export default function BudgetCard({
  budget,
  transactions,
  onEditBudget,
  onDeleteBudget,
}: BudgetCardProps) {
  const spent = calculateBudgetSpent(budget, transactions);
  const remaining = calculateBudgetRemaining(budget, transactions);
  const percentage = calculateBudgetPercentage(budget, transactions);

  const isOverBudget = remaining < 0;

  const progressColor =
    percentage > 100 ? "bg-red-600" : percentage >= 80 ? "bg-amber-500" : "bg-indigo-600";

  const progressWidth = Math.min(Math.max(percentage, 0), 100);

  const categoryName = budget.category.charAt(0).toUpperCase() + budget.category.slice(1);

  return (
    <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">{categoryName}</h3>

        <span className="text-sm font-medium text-slate-600">{percentage.toFixed(1)}% used</span>
      </div>

      <div
        role="progressbar"
        aria-label={`${categoryName} budget used`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progressWidth}
        aria-valuetext={`${percentage.toFixed(1)}% of budget used`}
        className="h-3 overflow-hidden rounded-full bg-slate-100"
      >
        <div
          className={`h-full rounded-full transition-all duration-300 ${progressColor}`}
          style={{ width: `${progressWidth}%` }}
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500">Spent</p>
          <p className="text-base font-semibold text-slate-900">{formatCurrency(spent)}</p>
        </div>

        <div className="text-right">
          <p className="text-xs text-slate-500">{isOverBudget ? "Over budget" : "Remaining"}</p>

          <p
            className={`text-base font-semibold ${
              isOverBudget ? "text-red-600" : "text-slate-900"
            }`}
          >
            {formatCurrency(Math.abs(remaining))}
          </p>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-3">
        <p className="text-xs text-slate-500">Monthly limit: {formatCurrency(budget.limit)}</p>
      </div>

      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => onEditBudget?.(budget)}
          disabled={!onEditBudget}
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 disabled:opacity-50"
        >
          <Pencil size={16} aria-hidden="true" />
          Edit Budget
        </button>
        <button
          type="button"
          onClick={() => onDeleteBudget?.(budget)}
          disabled={!onDeleteBudget}
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
        >
          <Trash2 size={16} aria-hidden="true" />
          Delete
        </button>
      </div>
    </div>
  );
}
