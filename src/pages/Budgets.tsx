import { useState } from "react";
import BudgetCard from "../components/BudgetCard.tsx";
import { mockBudgets } from "../data/mockData.ts";
import type { Transaction } from "../types/transaction.ts";
import type { Budget } from "../types/budget.ts";
import BudgetForm from "../components/BudgetForm.tsx";

interface BudgetsProps {
  transactions: Transaction[];
}

export default function Budgets({ transactions }: BudgetsProps) {
  const [selectedMonth, setSelectedMonth] = useState("2026-11");
  const [budgets, setBudgets] = useState<Budget[]>(mockBudgets);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);

  const filteredBudgets = budgets.filter((budget) => budget.month === selectedMonth);

  function handleAddBudget(newBudget: Budget) {
    setBudgets((prevBudgets) => [...prevBudgets, newBudget]);
    setSelectedMonth(newBudget.month);
  }

  function handleEditBudget(budget: Budget) {
    setEditingBudget(budget);
  }

  function handleUpdateBudget(updatedBudget: Budget) {
    setBudgets((prevBudgets) =>
      prevBudgets.map((prevBudget) =>
        prevBudget.id === updatedBudget.id ? updatedBudget : prevBudget,
      ),
    );

    setEditingBudget(null);
    setSelectedMonth(updatedBudget.month);
  }

  return (
    <div className="space-y-6">
      <BudgetForm
        onAddBudget={handleAddBudget}
        budget={editingBudget}
        key={editingBudget?.id ?? "new"}
        onUpdateBudget={handleUpdateBudget}
        existingBudgets={budgets}
      />

      {editingBudget && (
        <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4 text-sm text-indigo-900">
          <p>
            Editing budget:{" "}
            <strong>
              {editingBudget.category.charAt(0).toUpperCase() + editingBudget.category.slice(1)}
            </strong>
            {" — "}
            {editingBudget.month}
          </p>

          <button
            type="button"
            onClick={() => setEditingBudget(null)}
            className="mt-2 font-medium text-indigo-600 hover:underline"
          >
            Cancel editing
          </button>
        </div>
      )}

      <div>
        <label htmlFor="budget-filter-month" className="block text-sm font-medium text-slate-700">
          Select month
        </label>

        <input
          id="budget-filter-month"
          type="month"
          value={selectedMonth}
          onChange={(event) => setSelectedMonth(event.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        />
      </div>
      {filteredBudgets.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredBudgets.map((budget) => (
            <BudgetCard
              key={budget.id}
              budget={budget}
              transactions={transactions}
              onEditBudget={handleEditBudget}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-500">No budgets found for this month.</p>
      )}
    </div>
  );
}
