import type { Transaction } from "../types/transaction.ts";
import { calculateMonthlySummary } from "../utils/analyticsCalculations.ts";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface AnalyticsProps {
  transactions: Transaction[];
}

export default function Analytics({ transactions }: AnalyticsProps) {
  const monthlySummary = calculateMonthlySummary(transactions);

  const chartData = monthlySummary.map((summary) => ({
    month: new Intl.DateTimeFormat("en-CA", {
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${summary.month}-01T00:00:00Z`)),
    income: summary.income / 100,
    expenses: summary.expenses / 100,
  }));

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

        {chartData.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">
            No transaction data available for this chart.
          </p>
        ) : (
          <div className="mt-6 h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                barGap={8}
                barCategoryGap="30%"
                margin={{
                  top: 20,
                  right: 20,
                  left: 0,
                  bottom: 5,
                }}
              >
                {/* Grid lines background */}
                <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />

                {/* X Axis bound to the 'month' property of the dataset */}
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />

                {/* Y Axis automatically scales based on data values */}
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />

                {/* Interactive hover tooltip */}
                <Tooltip cursor={{ fill: "rgba(0, 0, 0, 0.05)" }} />

                {/* Chart legend */}
                <Legend position="bottom" height={36} iconType="circle" />

                {/* Bar Data Series */}
                <Bar
                  dataKey="income"
                  fill="#6366f1"
                  maxBarSize={40}
                  radius={[4, 4, 0, 0]}
                  name="Income"
                />
                <Bar
                  dataKey="expenses"
                  fill="#f59e0b"
                  maxBarSize={40}
                  radius={[4, 4, 0, 0]}
                  name="Expenses"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
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
