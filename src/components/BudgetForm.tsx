import type { ExpenseCategory } from "../types/transaction.ts";

const expenseCategories: ExpenseCategory[] = [
  "food",
  "housing",
  "transportation",
  "utilities",
  "entertainment",
  "health",
  "shopping",
  "other",
];

export default function BudgetForm() {
  return (
    <form
      noValidate
      onSubmit={(event) => event.preventDefault()}
      className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-slate-900">Create Budget</h2>

      <div className="space-y-1">
        <label htmlFor="budget-category" className="block text-sm font-medium text-slate-700">
          Category
        </label>

        <select
          id="budget-category"
          required
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        >
          {expenseCategories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <label htmlFor="budget-limit" className="block text-sm font-medium text-slate-700">
          Monthly Limit (CAD)
        </label>

        <input
          id="budget-limit"
          type="number"
          required
          min="0.01"
          step="0.01"
          placeholder="500.00"
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="budget-month" className="block text-sm font-medium text-slate-700">
          Month
        </label>

        <input
          id="budget-month"
          type="month"
          required
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
      >
        Create Budget
      </button>
    </form>
  );
}
