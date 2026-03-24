import ServiceForm from "../Form";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NewServicePage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/services" 
          className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-white/5 text-gray-400 hover:text-primary transition-all"
        >
          <ChevronLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Thêm Dịch Vụ Mới</h1>
          <p className="text-sm text-gray-500 font-medium">Tạo một dịch vụ mới hiển thị trên website</p>
        </div>
      </div>

      <ServiceForm />
    </div>
  );
}
