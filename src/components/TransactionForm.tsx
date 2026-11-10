import type {
  ExpenseCategory,
  IncomeCategory,
  TransactionCategory,
  TransactionType,
} from "../types/transaction.ts";
import { useState } from "react";

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

export function TransactionForm() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<TransactionType>("expense");
  const [category, setCategory] = useState<TransactionCategory>("food");
  const [date, setDate] = useState("");

  const availableCategories = type === "income" ? incomeCategories : expenseCategories;

  return (
    <form
      className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      onSubmit={(event) => event.preventDefault()}
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
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="amount" className="block text-sm font-medium text-slate-700">
          Amount
        </label>
        <input
          id="amount"
          type="number"
          required
          placeholder="2500"
          className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-indigo-500 focus:outline-none"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
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
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
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
        >
          {availableCategories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
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
        />
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
