import type { Transaction } from "../types/transaction.ts";
import { formatCurrency } from "../utils/currency.ts";
import { Pencil } from "lucide-react";

interface TransactionTableProps {
  transactions: Transaction[];
  onEditTransaction?: (transaction: Transaction) => void;
}

export default function TransactionTable({
  transactions,
  onEditTransaction,
}: TransactionTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            <th scope="col" className="px-6 py-4">
              Description
            </th>
            <th scope="col" className="px-6 py-4">
              Category
            </th>
            <th scope="col" className="px-6 py-4">
              Date
            </th>
            <th scope="col" className="px-6 py-4">
              Type
            </th>
            <th scope="col" className="px-6 py-4 text-right">
              Amount
            </th>
            <th scope="col" className="px-6 py-4">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="hover:bg-slate-50">
              <td className="px-6 py-4 font-medium text-slate-900">{transaction.description}</td>

              <td className="px-6 py-4 capitalize text-slate-600">{transaction.category}</td>

              <td className="px-6 py-4 text-slate-600">{transaction.date}</td>

              <td className="px-6 py-4 capitalize text-slate-600">{transaction.type}</td>

              <td
                className={`px-6 py-4 text-right font-semibold whitespace-nowrap ${
                  transaction.type === "income" ? "text-green-600" : "text-red-600"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}
                {formatCurrency(transaction.amount)}
              </td>
              <td className="px-6 py-4">
                <button
                  type="button"
                  onClick={() => onEditTransaction?.(transaction)}
                  disabled={!onEditTransaction}
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 disabled:opacity-50"
                >
                  <Pencil size={16} aria-hidden={true} />
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
