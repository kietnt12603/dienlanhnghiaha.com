'use client';

import { useState } from "react";
import { updateSettings } from "@/actions/admin";
import { Save, Phone, MapPin, Mail, MessageCircle, Lock, ShieldCheck } from "lucide-react";

export default function SettingsForm({ initialData }: { initialData: any }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    phone: initialData?.phone || "0905.436.359",
    address: initialData?.address || "KĐT An Phú Quý, Điện Bàn, Quảng Nam",
    email: initialData?.email || "",
    facebook: initialData?.facebook || "",
    messenger: initialData?.messenger || "",
    adminPassword: "", // Giữ trống trừ khi muốn đổi
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Chỉ gửi mật khẩu nếu nó không trống
    const dataToSubmit = { ...formData } as any;
    if (!dataToSubmit.adminPassword) {
      delete dataToSubmit.adminPassword;
    }

    const res = await updateSettings(dataToSubmit);
    if (res.success) {
      alert("Đã cập nhật cài đặt thành công!");
    } else {
      alert("Lỗi: " + res.error);
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Company Info */}
        <div className="space-y-8">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
            <ShieldCheck size={14} className="text-primary" />
            Thông tin cơ bản
          </h2>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-4 flex items-center gap-2">
                <Phone size={12} /> Số điện thoại Hotline
              </label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-4 flex items-center gap-2">
                <MapPin size={12} /> Địa chỉ cửa hàng
              </label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-4 flex items-center gap-2">
                <Mail size={12} /> Email liên hệ
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Security & Social */}
        <div className="space-y-8">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
            <Lock size={14} className="text-primary" />
            Bảo mật & Mạng xã hội
          </h2>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-4 flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-400 rounded-sm flex items-center justify-center text-[8px] text-white font-bold">f</div> Link Facebook Fanpage
              </label>
              <input
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-primary transition-colors"
                placeholder="https://facebook.com/..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-4 flex items-center gap-2">
                <MessageCircle size={12} /> Link Messenger
              </label>
              <input
                name="messenger"
                value={formData.messenger}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-primary transition-colors"
                placeholder="https://m.me/..."
              />
            </div>

            <div className="space-y-2 p-6 bg-red-50/50 dark:bg-red-950/20 rounded-3xl border border-red-100 dark:border-red-900/30">
              <label className="text-[10px] font-black uppercase text-red-500 ml-4 flex items-center gap-2 mb-2">
                <Lock size={12} /> Đổi mật khẩu Admin
              </label>
              <input
                type="password"
                name="adminPassword"
                value={formData.adminPassword}
                onChange={handleChange}
                placeholder="Nhập mật khẩu mới (để trống nếu không đổi)"
                className="w-full bg-white dark:bg-slate-900 border border-red-100 dark:border-red-900/30 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-red-500 transition-colors"
              />
              <p className="text-[10px] text-red-400 font-bold mt-2 ml-4 lowercase italic">* Cẩn thận: Đổi mật khẩu sẽ ảnh hưởng đến việc đăng nhập lần sau.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-gray-100 dark:border-white/5">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary text-white px-12 py-4 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center gap-3 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
        >
          {isLoading ? "Đang lưu..." : (
            <>
              <Save size={18} />
              Lưu toàn bộ thay đổi
            </>
          )}
        </button>
      </div>
    </form>
  );
}
