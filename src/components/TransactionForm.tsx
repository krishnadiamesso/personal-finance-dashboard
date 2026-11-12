import type {
  ExpenseCategory,
  IncomeCategory,
  Transaction,
  TransactionCategory,
  TransactionType,
} from "../types/transaction.ts";
import { useState } from "react";

interface FormErrors {
  description?: string;
  amount?: string;
  type?: string;
  category?: string;
  date?: string;
}

interface TransactionFormProps {
  onAddTransaction: (transaction: Transaction) => void;
}

const incomeCategories: IncomeCategory[] = ["salary", "freelance", "investment", "gift", "other"];

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

function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const parsedDate = new Date(`${value}T00:00:00Z`);

  return !Number.isNaN(parsedDate.getTime()) && parsedDate.toISOString().slice(0, 10) === value;
}

function isValidAmount(value: string): boolean {
  const trimmedValue = value.trim();
  const numericAmount = Number(trimmedValue);

  return (
    /^\d+(\.\d{1,2})?$/.test(trimmedValue) && Number.isFinite(numericAmount) && numericAmount > 0
  );
}

export function TransactionForm({ onAddTransaction }: TransactionFormProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<TransactionType>("expense");
  const [category, setCategory] = useState<TransactionCategory>("food");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  function validateForm(): FormErrors {
    const newErrors: FormErrors = {};

    if (!description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!isValidAmount(amount)) {
      newErrors.amount = "Enter a valid amount greater than zero (up to 2 decimal places)";
    }

    if (type !== "income" && type !== "expense") {
      newErrors.type = "Invalid transaction type";
    }

    if (!availableCategories.some((item) => item === category)) {
      newErrors.category = "Invalid category for this transaction type";
    }

    if (!isValidDate(date.trim())) {
      newErrors.date = "Invalid date";
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

    const baseTransaction = {
      id: crypto.randomUUID(),
      description: description.trim(),
      amount: Math.round(Number(amount) * 100),
      date: date.trim(),
    };

    let newTransaction: Transaction;

    if (type === "income") {
      newTransaction = {
        ...baseTransaction,
        type: "income",
        category: category as IncomeCategory,
      };
    } else {
      newTransaction = {
        ...baseTransaction,
        type: "expense",
        category: category as ExpenseCategory,
      };
    }

    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
    setDate("");
    setErrors({});

    onAddTransaction(newTransaction);
  }

  const availableCategories = type === "income" ? incomeCategories : expenseCategories;

  return (
    <form
      className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      noValidate
      onSubmit={handleSubmit}
    >
      <h2 className="text-lg font-semibold text-slate-900">Add Transaction</h2>

      <div className="space-y-1">
        <label htmlFor="description" className="block text-sm font-medium text-slate-700">
          Description
        </label>

        <input
          id="description"
          type="text"
          required
          placeholder="e.g. Grocery shopping"
          className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-indigo-500 focus:outline-none"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={errors.description ? "description-error" : undefined}
        />

        {errors.description && (
          <p id="description-error" role="alert" className="text-sm text-red-600">
            {errors.description}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="amount" className="block text-sm font-medium text-slate-700">
          Amount
        </label>
        <input
          id="amount"
          type="number"
          required
          min="0.01"
          step="0.01"
          placeholder="0.00"
          className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-indigo-500 focus:outline-none"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          aria-invalid={Boolean(errors.amount)}
          aria-describedby={errors.amount ? "amount-error" : undefined}
        />
        {errors.amount && (
          <p id="amount-error" role="alert" className="text-sm text-red-600">
            {errors.amount}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="type" className="block text-sm font-medium text-slate-700">
          Type
        </label>
        <select
          id="type"
          required
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 focus:border-indigo-500 focus:outline-none"
          value={type}
          onChange={(event) => {
            const newType = event.target.value as TransactionType;
            setType(newType);
            setCategory(newType === "income" ? "salary" : "food");
          }}
          aria-invalid={Boolean(errors.type)}
          aria-describedby={errors.type ? "type-error" : undefined}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        {errors.type && (
          <p id="type-error" role="alert" className="text-sm text-red-600">
            {errors.type}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="category" className="block text-sm font-medium text-slate-700">
          Category
        </label>
        <select
          id="category"
          required
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 focus:border-indigo-500 focus:outline-none"
          value={category}
          onChange={(event) => {
            const newCategory = event.target.value as TransactionCategory;
            setCategory(newCategory);
          }}
          aria-invalid={Boolean(errors.category)}
          aria-describedby={errors.category ? "category-error" : undefined}
        >
          {availableCategories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
        {errors.category && (
          <p id="category-error" role="alert" className="text-sm text-red-600">
            {errors.category}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="date" className="block text-sm font-medium text-slate-700">
          Date
        </label>
        <input
          id="date"
          type="date"
          required
          className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-indigo-500 focus:outline-none"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          aria-invalid={Boolean(errors.date)}
          aria-describedby={errors.date ? "date-error" : undefined}
        />
        {errors.date && (
          <p id="date-error" role="alert" className="text-sm text-red-600">
            {errors.date}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
      >
        Add Transaction
      </button>
    </form>
  );
}
