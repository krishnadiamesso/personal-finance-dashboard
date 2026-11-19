import type { Transaction } from "../types/transaction.ts";

interface AnalyticsProps {
  transactions: Transaction[];
}

export default function Analytics({ transactions }: AnalyticsProps) {
  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-500">Analyzing {transactions.length} transactions</p>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {["Total Income", "Total Expenses", "Net Savings", "Savings Rate"].map((title) => (
          <div key={title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-medium text-slate-500">{title}</h2>
            <p className="mt-2 text-2xl font-semibold text-slate-900">—</p>
          </div>
        ))}
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Income vs. Expenses</h2>

        <p className="mt-4 text-sm text-slate-500">
          Monthly income and expense chart will appear here.
        </p>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Spending by Category</h2>

        <p className="mt-4 text-sm text-slate-500">
          Spending by Category: container for a future pie/donut chart chart will appear here.
        </p>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Date range</h2>

        <p className="mt-4 text-sm text-slate-500">
          Date range: placeholder for a future period selector. chart chart will appear here.
        </p>
      </section>
    </div>
  );
}
