import { useState } from "react";
import BudgetCard from "../components/BudgetCard.tsx";
import { mockBudgets } from "../data/mockData.ts";
import type { Transaction } from "../types/transaction.ts";

interface BudgetsProps {
  transactions: Transaction[];
}

export default function Budgets({ transactions }: BudgetsProps) {
  const [selectedMonth, setSelectedMonth] = useState("2026-11");

  const filteredBudgets = mockBudgets.filter((budget) => budget.month === selectedMonth);

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="budget-month" className="block text-sm font-medium text-slate-700">
          Select month
        </label>

        <input
          id="budget-month"
          type="month"
          value={selectedMonth}
          onChange={(event) => setSelectedMonth(event.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        />
      </div>
      {filteredBudgets.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredBudgets.map((budget) => (
            <BudgetCard key={budget.id} budget={budget} transactions={transactions} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-500">No budgets found for this month.</p>
      )}
    </div>
  );
}
