import { getSettings } from "@/actions/admin";
import SettingsForm from "./SettingsForm";
import { Settings as SettingsIcon } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Cài Đặt Hệ Thống</h1>
        <p className="text-sm font-bold text-primary italic">Quản lý thông tin liên hệ và cấu hình website</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-gray-100 dark:border-white/5 shadow-premium overflow-hidden p-10">
        <SettingsForm initialData={settings} />
      </div>
    </div>
  );
}
