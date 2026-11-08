import { Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";
import {
  calculateBalance,
  calculateSavingsRate,
  calculateTotalExpenses,
  calculateTotalIncome,
} from "../utils/calculations.ts";
import { mockTransactions } from "../data/mockData.ts";
import StatCard from "../components/StatCard.tsx";
import { formatCurrency } from "../utils/currency.ts";

export default function Dashboard() {
  const balance = calculateBalance(mockTransactions);
  const income = calculateTotalIncome(mockTransactions);
  const expenses = calculateTotalExpenses(mockTransactions);
  const savingsRate = calculateSavingsRate(mockTransactions);

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard title="Balance" value={formatCurrency(balance)} icon={Wallet} />
      <StatCard title="Total Income" value={formatCurrency(income)} icon={TrendingUp} />
      <StatCard title="Total Expenses" value={formatCurrency(expenses)} icon={TrendingDown} />
      <StatCard title="Savings Rate" value={`${savingsRate.toFixed(1)}%`} icon={PiggyBank} />
    </section>
  );
}
