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
import type { Transaction } from "../types/transaction.ts";

interface IncomeExpenseChartProps {
  transactions: Transaction[];
}

interface MonthlyTotals {
  income: number;
  expenses: number;
}

export default function IncomeExpenseChart({ transactions }: IncomeExpenseChartProps) {
  const monthlyTotals = transactions.reduce<Record<string, MonthlyTotals>>((acc, transaction) => {
    const month = transaction.date.slice(0, 7);

    if (!acc[month]) {
      acc[month] = {
        income: 0,
        expenses: 0,
      };
    }

    if (transaction.type === "income") {
      acc[month].income += transaction.amount;
    } else {
      acc[month].expenses += transaction.amount;
    }

    return acc;
  }, {});

  const data = Object.entries(monthlyTotals)
    .sort(([monthA], [monthB]) => monthA.localeCompare(monthB))
    .map(([month, totals]) => ({
      month: new Intl.DateTimeFormat("en-CA", {
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      }).format(new Date(`${month}-01T00:00:00Z`)),
      income: totals.income / 100,
      expenses: totals.expenses / 100,
    }));

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-semibold text-slate-900">Income vs Expenses</h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
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
              maxBarSize={36}
              radius={[5, 5, 0, 0]}
              name="Income"
            />
            <Bar
              dataKey="expenses"
              fill="#14b8a6"
              maxBarSize={36}
              radius={[5, 5, 0, 0]}
              name="Expenses"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
