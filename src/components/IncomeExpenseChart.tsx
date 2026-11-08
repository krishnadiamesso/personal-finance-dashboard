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

const data = [
  { month: "Aug", income: 4800, expenses: 3100 },
  { month: "Sep", income: 5200, expenses: 2900 },
  { month: "Oct", income: 6000, expenses: 3450 },
  { month: "Nov", income: 5000, expenses: 2300 },
];

export default function IncomeExpenseChart() {
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
