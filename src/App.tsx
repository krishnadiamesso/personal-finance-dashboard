import { useCallback, useEffect, useRef, useState } from "react";
import type { Page } from "./types/navigation.ts";
import Sidebar from "./components/Sidebar.tsx";
import Header from "./components/Header.tsx";
import { Menu } from "lucide-react";
import Dashboard from "./pages/Dashboard.tsx";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isSidebarOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeSidebar();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSidebarOpen, closeSidebar]);

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          closeSidebar();
        }}
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
      />

      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      <main className="min-w-0 flex-1 p-4 md:p-8">
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open navigation"
          aria-expanded={isSidebarOpen}
          aria-controls="mobile-sidebar"
          className="mb-4 rounded-lg p-2 text-slate-900 hover:bg-slate-200 md:hidden"
        >
          <Menu size={24} />
        </button>
        <Header title={pageTitles[currentPage]} subtitle={pageSubTitles[currentPage]} />
        {currentPage === "dashboard" && <Dashboard />}
      </main>
    </div>
  );
}

export default App;
