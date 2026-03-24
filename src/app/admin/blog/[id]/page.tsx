import dbConnect from "@/lib/db";
import { Post } from "@/models";
import PostForm from "../Form";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Kiểm tra xem ID có đúng định dạng MongoDB ObjectId không
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    notFound();
  }

  await dbConnect();
  const data = await Post.findById(id);
  if (!data) notFound();
  
  const post = JSON.parse(JSON.stringify(data));

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/blog" 
          className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-white/5 text-gray-400 hover:text-primary transition-all"
        >
          <ChevronLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Chỉnh Sửa Bài Viết</h1>
          <p className="text-sm font-bold text-primary">Đang chỉnh sửa: {post.title}</p>
        </div>
      </div>

      <PostForm initialData={post} />
    </div>
  );
}
