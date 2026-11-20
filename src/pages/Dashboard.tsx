import { type LucideIcon, PiggyBank, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import {
  calculateTotalBalance,
  calculateSavingsRate,
  calculateTotalExpenses,
  calculateTotalIncome,
} from "../utils/calculations.ts";
import StatCard from "../components/StatCard.tsx";
import { formatCurrency } from "../utils/currency.ts";
import IncomeExpenseChart from "../components/IncomeExpenseChart.tsx";
import type { Transaction } from "../types/transaction.ts";

type DashboardMetric = "Balance" | "Total Income" | "Total Expenses" | "Savings Rate";

interface DashboardProps {
  transactions: Transaction[];
}

interface DashboardCard {
  title: DashboardMetric;
  value: string;
  icon: LucideIcon;
}

export default function Dashboard({ transactions }: DashboardProps) {
  const balance = calculateTotalBalance(transactions);
  const income = calculateTotalIncome(transactions);
  const expenses = calculateTotalExpenses(transactions);
  const savingsRate = calculateSavingsRate(transactions);

  const cards: DashboardCard[] = [
    { title: "Balance", value: formatCurrency(balance), icon: Wallet },
    { title: "Total Income", value: formatCurrency(income), icon: TrendingUp },
    { title: "Total Expenses", value: formatCurrency(expenses), icon: TrendingDown },
    { title: "Savings Rate", value: `${savingsRate.toFixed(1)}%`, icon: PiggyBank },
  ];

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <StatCard key={card.title} title={card.title} value={card.value} icon={card.icon} />
        ))}
      </section>

      <section aria-label="Finance Charts">
        <IncomeExpenseChart transactions={transactions} />
      </section>
    </div>
  );
}
