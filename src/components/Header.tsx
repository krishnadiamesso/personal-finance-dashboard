interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">{title}</h1>

        {subtitle && <p className="mt-2 text-slate-600">{subtitle}</p>}
      </div>
    </header>
  );
}
