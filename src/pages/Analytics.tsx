import type { Transaction } from "../types/transaction.ts";
import {
  calculateMonthlySummary,
  calculateSpendingByCategory,
} from "../utils/analyticsCalculations.ts";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useState } from "react";

interface AnalyticsProps {
  transactions: Transaction[];
}

const CATEGORY_COLORS = [
  "#6366f1",
  "#f59e0b",
  "#10b981",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#ec4899",
  "#84cc16",
];

export default function Analytics({ transactions }: AnalyticsProps) {
  const monthlySummary = calculateMonthlySummary(transactions);
  const categorySummary = calculateSpendingByCategory(transactions);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const isInvalidRange = Boolean(startDate && endDate && startDate > endDate);

  const categoryChartData = categorySummary.map((summary, index) => ({
    name: summary.category.charAt(0).toUpperCase() + summary.category.slice(1),
    value: summary.total / 100,
    fill: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
  }));

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
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Date range</h2>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <label
              htmlFor="analytics-start-date"
              className="block text-sm font-medium text-slate-700"
            >
              Start date
            </label>

            <input
              id="analytics-start-date"
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              aria-invalid={isInvalidRange}
              aria-describedby={isInvalidRange ? "analytics-date-error" : undefined}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="analytics-end-date"
              className="block text-sm font-medium text-slate-700"
            >
              End date
            </label>

            <input
              id="analytics-end-date"
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
              aria-invalid={isInvalidRange}
              aria-describedby={isInvalidRange ? "analytics-date-error" : undefined}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            />
          </div>
          {isInvalidRange && (
            <p id="analytics-date-error" role="alert" className="mt-3 text-sm text-red-600">
              Start date must not be later than end date.
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={() => {
            setStartDate("");
            setEndDate("");
          }}
          className="mt-4 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Clear dates
        </button>
      </section>
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

        {categoryChartData.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">No expense data available.</p>
        ) : (
          <div className="mt-6 h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={100}
                  paddingAngle={3}
                />

                <Tooltip />

                <Legend position="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>
    </div>
  );
}
