import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
}

export default function StatCard({ title, value, icon }: StatCardProps) {
  const Icon = icon;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <Icon size={24} className="text-indigo-500" aria-hidden="true" />
      </div>

      <p className="mt-4 text-2xl font-bold tracking-tight text-slate-900">{value}</p>
    </div>
  );
}
