import TransactionTable from "../components/TransactionTable.tsx";
import { mockTransactions } from "../data/mockData.ts";
import { useState } from "react";
import type { Transaction, TransactionCategory, TransactionType } from "../types/transaction.ts";
import { ChevronDown } from "lucide-react";
import { TransactionForm } from "../components/TransactionForm.tsx";

type SortOption = "newest" | "oldest" | "amount-high" | "amount-low";

export default function Transactions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<TransactionType | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<TransactionCategory | "all">("all");
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const categories = [...new Set(transactions.map((transaction) => transaction.category))].sort();

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description.toLowerCase().includes(normalizedQuery);
    const matchesType = typeFilter === "all" || transaction.type === typeFilter;
    const matchesCategory = categoryFilter === "all" || transaction.category === categoryFilter;
    return matchesSearch && matchesType && matchesCategory;
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    switch (sortOption) {
      case "newest":
        return b.date.localeCompare(a.date);
      case "oldest":
        return a.date.localeCompare(b.date);
      case "amount-high":
        return b.amount - a.amount;
      case "amount-low":
        return a.amount - b.amount;
    }
  });

  function handleAddTransaction(newTransaction: Transaction) {
    setTransactions((prevTransactions) => [newTransaction, ...prevTransactions]);
  }

  return (
    <div className="space-y-6">
      <TransactionForm onAddTransaction={handleAddTransaction} />
      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search transactions..."
              aria-label="Search transactions"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div className="relative">
            <select
              value={typeFilter}
              onChange={(event) => setTypeFilter(event.target.value as TransactionType | "all")}
              aria-label="Filter by transaction type"
              className="w-full appearance-none rounded-lg border border-slate-200 bg-white
      py-3 pl-4 pr-10 text-sm text-slate-900
      focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100
      sm:w-48"
            >
              <option value="all">All transactions</option>
              <option value="income">Income</option>
              <option value="expense">Expenses</option>
            </select>

            <ChevronDown
              size={16}
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
          </div>

          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(event) =>
                setCategoryFilter(event.target.value as TransactionCategory | "all")
              }
              aria-label="Filter by category"
              className="w-full appearance-none rounded-lg border border-slate-200 bg-white
      py-3 pl-4 pr-10 text-sm text-slate-900
      focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100
      sm:w-48"
            >
              <option value="all">All categories</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            <ChevronDown
              size={16}
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
          </div>

          <div className="relative">
            <select
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value as SortOption)}
              aria-label="Sort transactions"
              className="w-full appearance-none rounded-lg border border-slate-200 bg-white
      py-3 pl-4 pr-10 text-sm text-slate-900
      focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100
      sm:w-48"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="amount-high">Amount: high to low</option>
              <option value="amount-low">Amount: low to high</option>
            </select>
            <ChevronDown
              size={16}
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
          </div>
        </div>
        <TransactionTable transactions={sortedTransactions} />
      </div>
    </div>
  );
}
