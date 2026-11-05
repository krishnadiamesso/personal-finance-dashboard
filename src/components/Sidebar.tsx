import {
  ArrowLeftRight,
  ChartNoAxesColumn,
  Goal,
  LayoutDashboard,
  Settings,
  Wallet,
  X,
} from "lucide-react";

import type { Page } from "../types/navigation.ts";
import { useEffect, useRef } from "react";

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
  { id: "budgets", label: "Budgets", icon: Wallet },
  { id: "analytics", label: "Analytics", icon: ChartNoAxesColumn },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "goals", label: "Goals", icon: Goal },
] as const;

export default function Sidebar({ currentPage, onNavigate, isOpen, onClose }: SidebarProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <aside
      id="mobile-sidebar"
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 p-4 text-white transition-transform duration-300
    md:static md:visible md:translate-x-0 ${isOpen ? "visible translate-x-0" : "invisible -translate-x-full"}`}
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label="Close navigation"
        className="md:hidden"
      >
        <X size={24} />
      </button>
      <div className="mb-8 text-2xl font-bold">FinTrack</div>
      <nav aria-label="Main navigation" className="space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              aria-current={isActive ? "page" : undefined}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400
              ${isActive ? "bg-slate-700 text-white" : "text-slate-300 hover:bg-slate-800"}`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
