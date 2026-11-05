import { useState } from "react";
import type { Page } from "./types/navigation.ts";
import Sidebar from "./components/Sidebar.tsx";
import Header from "./components/Header.tsx";

const pageTitles: Record<Page, string> = {
  dashboard: "Dashboard",
  transactions: "Transactions",
  budgets: "Budgets",
  analytics: "Analytics",
  settings: "Settings",
  goals: "Goals",
};

const pageSubTitles: Record<Page, string> = {
  dashboard: "Overview of your finances",
  transactions: "Manage your income and expenses",
  budgets: "Track your monthly spending limits",
  analytics: "Understand your spending patterns",
  settings: "Customize your preferences",
  goals: "Track your financial goals",
};

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />

      <main className="min-w-0 flex-1 p-8">
        <Header title={pageTitles[currentPage]} subtitle={pageSubTitles[currentPage]} />
      </main>
    </div>
  );
}

export default App;
