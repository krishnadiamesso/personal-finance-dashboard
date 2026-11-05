import {useState} from "react";
import type {Page} from "./types/navigation.ts";
import Sidebar from "./components/Sidebar.tsx";

const pageTitles: Record<Page, string> = {
    "dashboard": "Dashboard",
    "transactions": "Transactions",
    "budgets": "Budgets",
    "analytics": "Analytics",
    "settings": "Settings",
    "goals": "Goals"
}


function App() {
    const [currentPage, setCurrentPage] = useState<Page>("dashboard")

    return (
        <div className="flex min-h-screen bg-slate-100">
            <Sidebar currentPage={currentPage} onNavigate={setCurrentPage}/>

            <main className="min-w-0 flex-1 p-8">
                <h1 className="text-3xl font-bold text-slate-900">{pageTitles[currentPage]}</h1>

                <p className="mt-2 text-slate-600">Welcome to your personal finance dashboard</p>

            </main>
        </div>
    )
}

export default App
