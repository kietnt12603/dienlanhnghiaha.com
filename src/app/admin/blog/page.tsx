import dbConnect from "@/lib/db";
import { Post } from "@/models";
import Link from "next/link";
import { Edit, Trash2, Plus, FileText, Calendar } from "lucide-react";
import DeletePostButton from "./DeletePostButton";

import Pagination from "@/components/Pagination";

export const dynamic = 'force-dynamic';

export default async function AdminBlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = parseInt(page || "1", 10);
  const limit = 10;
  const skip = (currentPage - 1) * limit;

  await dbConnect();
  const [data, total] = await Promise.all([
    Post.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
    Post.countDocuments()
  ]);
  const posts = JSON.parse(JSON.stringify(data));
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Quản Lý Bài Viết</h1>
          <p className="text-sm text-gray-500 font-medium">Viết bài mới để thu hút khách hàng từ Google</p>
        </div>
        <Link 
          href="/admin/blog/new" 
          className="bg-primary text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:scale-105 active:scale-95"
        >
          <Plus size={20} />
          Viết bài mới
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {posts.length > 0 ? (
          <>
            {posts.map((post: any) => (
              <div key={post._id} className="bg-white dark:bg-slate-900 rounded-[32px] border border-gray-100 dark:border-white/5 shadow-premium overflow-hidden group hover:border-primary/50 transition-all duration-500 flex flex-col md:flex-row items-center">
                <div className="w-full md:w-64 h-48 overflow-hidden bg-gray-100 dark:bg-white/5 shrink-0">
                  {post.thumbnail ? (
                    <img 
                      src={post.thumbnail} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <FileText size={48} />
                    </div>
                  )}
                </div>

                <div className="p-8 grow flex flex-col md:flex-row justify-between items-start md:items-center gap-6 w-full">
                  <div className="space-y-2 grow">
                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <Calendar size={12} />
                      {new Date(post.createdAt).toLocaleDateString("vi-VN")}
                    </div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white line-clamp-1">{post.title}</h3>
                    <p className="text-sm font-medium italic text-primary">Slug: {post.slug}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 shrink-0">
                    <Link 
                      href={`/admin/blog/${post._id}`}
                      className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all"
                      title="Sửa"
                    >
                      <Edit size={20} />
                    </Link>
                    <DeletePostButton id={post._id} />
                  </div>
                </div>
              </div>
            ))}
            <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/admin/blog" />
          </>
        ) : (
          <div className="py-20 bg-white dark:bg-slate-900 rounded-[40px] border border-dashed border-gray-200 dark:border-white/10 flex flex-col items-center justify-center text-gray-400">
            <div className="bg-gray-50 dark:bg-white/5 p-8 rounded-full mb-4">
              <FileText size={64} />
            </div>
            <p className="font-bold italic">Chưa có bài viết nào. Hãy viết bài đầu tiên!</p>
          </div>
        )}
      </div>
    </div>
  );
}
