import TransactionTable from "../components/TransactionTable.tsx";
import { mockTransactions } from "../data/mockData.ts";
import { useState } from "react";

export default function Transactions() {
  const [searchQuery, setSearchQuery] = useState("");
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredTransactions = mockTransactions.filter((transaction) => {
    return transaction.description.toLocaleLowerCase().includes(normalizedQuery);
  });

  return (
    <div className="space-y-4">
      <input
        type="search"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder="Search transactions..."
        aria-label="Search transactions"
        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      />
      <TransactionTable transactions={filteredTransactions} />
    </div>
  );
}
