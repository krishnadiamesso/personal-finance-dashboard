import TransactionTable from "../components/TransactionTable.tsx";
import { mockTransactions } from "../data/mockData.ts";
import { useState } from "react";
import type { TransactionType } from "../types/transaction.ts";
import { ChevronDown } from "lucide-react";

export default function Transactions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<TransactionType | "all">("all");
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch = transaction.description.toLowerCase().includes(normalizedQuery);
    const matchesType = typeFilter === "all" || transaction.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
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
      </div>
      <TransactionTable transactions={filteredTransactions} />
    </div>
  );
}
