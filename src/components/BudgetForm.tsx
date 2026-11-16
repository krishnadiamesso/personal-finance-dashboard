import type { ExpenseCategory } from "../types/transaction.ts";
import { useState } from "react";
import type { Budget } from "../types/budget.ts";

interface BudgetFormErrors {
  category?: string;
  limit?: string;
  month?: string;
}

interface BudgetFormProps {
  onAddBudget: (budget: Budget) => void;
  onUpdateBudget: (budget: Budget) => void;
  budget?: Budget | null;
  existingBudgets: Budget[];
}

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

function isValidCategory(category: ExpenseCategory): boolean {
  return expenseCategories.includes(category);
}

function isValidLimit(limit: string): boolean {
  const trimmedLimit = limit.trim();
  if (!/^\d+(\.\d{1,2})?$/.test(trimmedLimit)) return false;

  const numericLimit = Number(trimmedLimit);
  return Number.isFinite(numericLimit) && numericLimit > 0;
}

function isValidMonth(month: string): boolean {
  return /^\d{4}-(0[1-9]|1[0-2])$/.test(month);
}

export default function BudgetForm({
  onAddBudget,
  onUpdateBudget,
  budget,
  existingBudgets,
}: BudgetFormProps) {
  const [category, setCategory] = useState<ExpenseCategory>(budget?.category ?? "food");
  const [limit, setLimit] = useState(budget ? (budget.limit / 100).toFixed(2) : "");
  const [month, setMonth] = useState(budget?.month ?? "");
  const [errors, setErrors] = useState<BudgetFormErrors>({});

  function validateForm(): BudgetFormErrors {
    const newErrors: BudgetFormErrors = {};

    const duplicateBudget = existingBudgets.some(
      (existingBudget) =>
        existingBudget.category === category &&
        existingBudget.month === month &&
        existingBudget.id !== budget?.id,
    );

    if (!isValidCategory(category)) {
      newErrors.category = "Invalid category selected.";
    } else if (duplicateBudget) {
      newErrors.category = "A budget already exists for this category and month.";
    }

    if (!isValidLimit(limit)) {
      newErrors.limit = "Enter a positive amount with up to two decimal places.";
    }

    if (!isValidMonth(month)) {
      newErrors.month = "Enter a valid month in YYYY-MM format.";
    }

    return newErrors;
  }

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const savedBudget: Budget = {
      id: budget?.id ?? crypto.randomUUID(),
      category,
      limit: Math.round(Number(limit) * 100),
      month,
    };

    if (budget) {
      onUpdateBudget(savedBudget);
    } else {
      onAddBudget(savedBudget);

      setCategory("food");
      setLimit("");
      setMonth("");
      setErrors({});
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-slate-900">
        {budget ? "Edit Budget" : "Create Budget"}
      </h2>

      <div className="space-y-1">
        <label htmlFor="budget-category" className="block text-sm font-medium text-slate-700">
          Category
        </label>

        <select
          id="budget-category"
          required
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          value={category}
          onChange={(event) => {
            const newCategory = event.target.value as ExpenseCategory;
            setCategory(newCategory);
          }}
          aria-invalid={Boolean(errors.category)}
          aria-describedby={errors.category ? "budget-category-error" : undefined}
        >
          {expenseCategories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>

        {errors.category && (
          <p id="budget-category-error" role="alert" className="text-sm text-red-600">
            {errors.category}
          </p>
        )}
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
          value={limit}
          onChange={(event) => setLimit(event.target.value)}
          aria-invalid={Boolean(errors.limit)}
          aria-describedby={errors.limit ? "budget-limit-error" : undefined}
        />
        {errors.limit && (
          <p id="budget-limit-error" role="alert" className="text-sm text-red-600">
            {errors.limit}
          </p>
        )}
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
          value={month}
          onChange={(event) => setMonth(event.target.value)}
          aria-invalid={Boolean(errors.month)}
          aria-describedby={errors.month ? "budget-month-error" : undefined}
        />
        {errors.month && (
          <p id="budget-month-error" role="alert" className="text-sm text-red-600">
            {errors.month}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
      >
        {budget ? "Edit Budget" : "Create Budget"}
      </button>
    </form>
  );
}
