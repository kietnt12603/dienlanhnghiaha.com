'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { upsertService } from "@/actions/admin";
import { Save, X, Image as ImageIcon, Upload } from "lucide-react";
import CldImageUpload from "@/components/CldImageUpload";

interface ServiceFormProps {
  initialData?: any;
}

export default function ServiceForm({ initialData }: ServiceFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    _id: initialData?._id || "",
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    image: initialData?.image || "",
    category: initialData?.category || "Máy lạnh",
    features: initialData?.features?.join("\n") || "",
  });

  const categories = ["Máy lạnh", "Tủ lạnh", "Máy giặt", "Khác"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Auto-generate slug from name if creating new
    if (name === "name" && !initialData?._id) {
      const slug = value
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[đĐ]/g, "d")
        .replace(/([^0-9a-z-\s])/g, "")
        .replace(/(\s+)/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "");
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Process features: string to array
    const processedData = {
      ...formData,
      features: formData.features.split("\n").map((f: string) => f.trim()).filter((f: string) => f !== "")
    };

    const res = await upsertService(processedData);
    if (res.success) {
      router.push("/admin/services");
      router.refresh();
    } else {
      alert("Lỗi: " + res.error);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white dark:bg-slate-900 p-10 rounded-[40px] border border-gray-100 dark:border-white/5 shadow-premium max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Name */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Tên dịch vụ</label>
          <input
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white outline-none focus:border-primary transition-colors"
            placeholder="Ví dụ: Vệ sinh máy lạnh"
          />
        </div>

        {/* Slug */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Slug (URL)</label>
          <input
            required
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl px-6 py-4 text-sm font-bold text-gray-400 dark:text-gray-500 outline-none focus:border-primary transition-colors"
            placeholder="ve-sinh-may-lanh"
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Danh mục</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white outline-none focus:border-primary transition-colors cursor-pointer appearance-none"
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Price */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Giá tiền</label>
          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white outline-none focus:border-primary transition-colors"
            placeholder="Ví dụ: 150.000đ hoặc Liên hệ"
          />
        </div>

        {/* Image Upload */}
        <div className="space-y-2 md:col-span-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4 flex items-center gap-2">
            <ImageIcon size={12} />
            Hình ảnh đại diện dịch vụ
          </label>
          <CldImageUpload 
            value={formData.image}
            onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
            onRemove={() => setFormData(prev => ({ ...prev, image: "" }))}
          />
        </div>

        {/* Description */}
        <div className="space-y-2 md:col-span-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Mô tả chi tiết (Hỗ trợ HTML)</label>
          <textarea
            required
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl px-6 py-4 text-sm font-medium text-gray-900 dark:text-white outline-none focus:border-primary transition-colors resize-none"
            placeholder="Nhập mô tả chi tiết từng bước, cam kết bảo hành..."
          />
        </div>

        {/* Features Checklist */}
        <div className="space-y-2 md:col-span-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Chi tiết dịch vụ (Mỗi dòng là 1 mục check)</label>
          <textarea
            name="features"
            value={formData.features}
            onChange={handleChange}
            rows={4}
            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl px-6 py-4 text-sm font-medium text-gray-900 dark:text-white outline-none focus:border-primary transition-colors resize-none"
            placeholder="Ví dụ:&#10;Kiểm tra xì gas&#10;Bơm gas máy lạnh&#10;Vệ sinh dàn nóng"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-8 py-3.5 rounded-2xl text-sm font-black text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
        >
          Hủy bỏ
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary text-white px-10 py-3.5 rounded-2xl text-sm font-black flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
        >
          {isLoading ? "Đang lưu..." : (
            <>
              <Save size={18} />
              Lưu dịch vụ
            </>
          )}
        </button>
      </div>
    </form>
  );
}
