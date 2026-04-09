import Link from "next/link";

const navItems = [
  { label: "Complaints", href: "/complaints" },
  { label: "Women Safety", href: "/women-safety" },
  { label: "Locality Issues", href: "/locality-issues" },
  { label: "Schemes", href: "/schemes" },
  { label: "Track History", href: "/dashboard" },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-4 md:px-6">
      <div className="glass-card mx-auto flex max-w-6xl items-center justify-between rounded-[24px] px-4 py-3 md:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#0F5D46] text-sm font-bold text-white shadow-lg">
            PR
          </div>

          <div className="min-w-0">
            <p className="hidden text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#5A6A61] sm:block">
              Telangana Citizen Platform
            </p>
            <h1 className="truncate text-lg font-semibold text-[#0A1F17]">
              Praja Raksha
            </h1>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 xl:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative py-1 text-sm font-semibold text-[#294136]/80 transition-all hover:text-[#0F5D46] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#0F5D46] after:transition-all hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/dashboard"
            className="hidden rounded-full px-4 py-2 text-sm font-medium text-[#294136] transition hover:bg-white/60 lg:inline-flex"
          >
            Dashboard
          </Link>

          <Link
            href="/complaints"
            className="gradient-button inline-flex rounded-full px-3 py-2 text-xs font-semibold transition sm:px-4 sm:text-sm md:px-5 md:py-2.5"
          >
            Raise Complaint
          </Link>
        </div>
      </div>
    </header>
  );
}