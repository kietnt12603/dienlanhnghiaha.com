'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { upsertPost } from "@/actions/admin";
import dynamic from 'next/dynamic';
import { Save, X, Image as ImageIcon, FileText, Upload } from "lucide-react";
import CldImageUpload from "@/components/CldImageUpload";

const Editor = dynamic(() => import('@/components/Editor'), { 
  ssr: false, 
  loading: () => <div className="w-full h-[400px] bg-gray-50 animate-pulse rounded-3xl" />
});

interface PostFormProps {
  initialData?: any;
}

export default function PostForm({ initialData }: PostFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    _id: initialData?._id || "",
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    content: initialData?.content || "",
    thumbnail: initialData?.thumbnail || "",
    metaTitle: initialData?.metaTitle || "",
    metaDescription: initialData?.metaDescription || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Auto-generate slug from title if creating new
    if (name === "title" && !initialData?._id) {
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
    
    const res = await upsertPost(formData);
    if (res.success) {
      router.push("/admin/blog");
      router.refresh();
    } else {
      alert("Lỗi: " + res.error);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10 max-w-5xl mx-auto pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content Side */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-slate-900 p-10 rounded-[40px] border border-gray-100 dark:border-white/5 shadow-premium space-y-8">
            <h2 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-3">
              <FileText className="text-primary" />
              Nội dung bài viết
            </h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Tiêu đề bài viết</label>
                <input
                  required
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl px-6 py-4 text-lg font-black text-gray-900 dark:text-white outline-none focus:border-primary transition-colors"
                  placeholder="Cách bảo quản máy lạnh bền bỉ..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Đường dẫn (Slug)</label>
                <input
                  required
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl px-6 py-4 text-sm font-bold text-gray-500 outline-none focus:border-primary transition-colors"
                  placeholder="cach-bao-quan-may-lanh"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Nội dung bài viết (Rich Text)</label>
                <Editor
                  value={formData.content}
                  onChange={(data) => setFormData(prev => ({ ...prev, content: data }))}
                  placeholder="Viết nội dung bài viết tại đây..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar/SEO Side */}
        <div className="space-y-8">
          {/* Thumbnail */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-gray-100 dark:border-white/5 shadow-premium space-y-6">
            <h2 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-3">
              <ImageIcon size={20} className="text-primary" />
              Ảnh bìa bài viết
            </h2>
            <div className="space-y-4">
              <CldImageUpload 
                value={formData.thumbnail}
                onChange={(url) => setFormData(prev => ({ ...prev, thumbnail: url }))}
                onRemove={() => setFormData(prev => ({ ...prev, thumbnail: "" }))}
              />
              {!formData.thumbnail && (
                <p className="text-[10px] font-bold text-gray-400 text-center italic">
                  Khuyên dùng ảnh 1200x630px để hiển thị tốt nhất trên Facebook/Zalo
                </p>
              )}
            </div>
          </div>

          {/* SEO Tags */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-gray-100 dark:border-white/5 shadow-premium space-y-6">
            <h2 className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-widest">Cấu hình SEO</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Meta Title</label>
                <input
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-primary transition-colors"
                  placeholder="SEO Title..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Meta Description</label>
                <textarea
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-xl px-4 py-3 text-xs font-medium outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Tóm tắt ngắn gọn bài viết..."
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-5 rounded-[32px] font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
          >
            {isLoading ? "Đang xuất bản..." : (
              <>
                <Save size={20} />
                Xuất bản ngay
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
