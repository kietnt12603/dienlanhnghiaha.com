import Link from "next/link";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  FileText, 
  Wrench, 
  LogOut,
  Bell,
  Search
} from "lucide-react";
import LogoutButton from "./LogoutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navLinks = [
    { name: "Tổng quan", href: "/admin", icon: <LayoutDashboard size={20} /> },
    { name: "Yêu cầu đặt lịch", href: "/admin", icon: <Users size={20} /> },
    { name: "Dịch vụ", href: "/admin/services", icon: <Wrench size={20} /> },
    { name: "Tin tức/Blog", href: "/admin/blog", icon: <FileText size={20} /> },
    { name: "Cài đặt", href: "/admin/settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="h-screen bg-gray-50/50 dark:bg-dark-bg flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-white dark:bg-slate-900 border-r border-gray-100 dark:border-white/5 hidden lg:flex flex-col">
        <div className="p-8">
          <Link href="/" className="flex flex-col">
            <span className="text-2xl font-black text-gray-900 dark:text-white leading-none">
              NGHĨA <span className="text-primary">HÀ</span>
            </span>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
              Admin Panel
            </span>
          </Link>
        </div>

        <nav className="grow px-4 space-y-2 mt-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-3 px-4 py-3 text-gray-500 dark:text-slate-400 hover:bg-primary/5 hover:text-primary rounded-2xl transition-all duration-300 font-bold group"
            >
              <div className="group-hover:scale-110 transition-transform">
                {link.icon}
              </div>
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-gray-100 dark:border-white/5 space-y-4">
          <div className="bg-primary/5 p-4 rounded-2xl">
            <p className="text-xs font-black text-primary uppercase tracking-widest mb-1">Hỗ trợ kỹ thuật</p>
            <p className="text-xs text-gray-500 font-bold">Hotline: 0905 436 359</p>
          </div>
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="grow flex flex-col h-screen">
        {/* Header */}
        <header className="h-20 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-white/5 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4 bg-gray-50 dark:bg-white/5 px-4 py-2.5 rounded-2xl w-96 border border-gray-100 dark:border-white/5">
            <Search size={18} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm..." 
              className="bg-transparent border-none outline-none text-sm font-medium w-full text-gray-900 dark:text-white placeholder:text-gray-500"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-400 hover:text-primary transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-gray-100 dark:border-white/5">
              <div className="text-right">
                <p className="text-sm font-black text-gray-900 dark:text-white">Admin</p>
                <p className="text-[10px] font-bold text-gray-500 uppercase">Quản trị viên</p>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-black">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-10 grow overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
