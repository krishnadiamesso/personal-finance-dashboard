import type { Transaction } from "../types/transaction.ts";
import { formatCurrency } from "../utils/currency.ts";

interface TransactionTableProps {
  transactions: Transaction[];
}

export default function TransactionTable({ transactions }: TransactionTableProps) {
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
