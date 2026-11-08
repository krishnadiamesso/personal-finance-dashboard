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
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            {/* Grid lines background */}
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            {/* X Axis bound to the 'month' property of the dataset */}
            <XAxis dataKey="month" tickLine={false} axisLine={false} />

            {/* Y Axis automatically scales based on data values */}
            <YAxis tickLine={false} axisLine={false} />

            {/* Interactive hover tooltip */}
            <Tooltip cursor={{ fill: "rgba(0, 0, 0, 0.05)" }} />

            {/* Chart legend */}
            <Legend />

            {/* Bar Data Series */}
            <Bar dataKey="income" fill="#4f46e5" radius={[4, 4, 0, 0]} name="Income ($)" />
            <Bar dataKey="expenses" fill="#f97316" radius={[4, 4, 0, 0]} name="Expenses ($)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
