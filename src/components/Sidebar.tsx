import {ArrowLeftRight, ChartNoAxesColumn, LayoutDashboard, Settings, Wallet, Goal} from "lucide-react"

import type {Page} from "../types/navigation.ts";

interface SidebarProps {
    currentPage: Page,
    onNavigate: (page: Page) => void
}

const navigationItems = [
    {id: "dashboard", label: "Dashboard", icon: LayoutDashboard},
    {id: "transactions", label: "Transactions", icon: ArrowLeftRight},
    {id: "budgets", label: "Budgets", icon: Wallet},
    {id: "analytics", label: "Analytics", icon: ChartNoAxesColumn},
    {id: "settings", label: "Settings", icon: Settings},
    {id: "goals", label: "Goals", icon: Goal}
] as const

export default function Sidebar(
    {
        currentPage,
        onNavigate
    }: SidebarProps
) {
    return (
        <aside className="w-64 min-h-screen bg-slate-900 p-4 text-white">
            <h1 className="mb-8 text-2xl font-bold">
                FinTrack
            </h1>
            <nav aria-label="Main navigation" className="space-y-2">
                {navigationItems.map(item => {
                    const Icon = item.icon
                    const isActive = currentPage === item.id

                    return (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => onNavigate(item.id)}
                            aria-current={isActive ? "page" : undefined}
                            className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors ${
                                isActive
                                    ? "bg-slate-700 text-white"
                                    : "text-slate-300 hover:bg-slate-800"
                            }`}
                        >
                            <Icon size={20}/>
                            <span>{item.label}</span>
                        </button>
                    )
                })}

            </nav>
        </aside>
    )
}