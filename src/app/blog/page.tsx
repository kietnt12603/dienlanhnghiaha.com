  import dbConnect from "@/lib/db";
import { Post } from "@/models";
import Link from "next/link";
import { Calendar, User, ChevronRight, FileText } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Tin Tức & Kinh Nghiệm Điện Lạnh",
  description: "Cập nhật những mẹo vặt, kinh nghiệm sử dụng máy lạnh, tủ lạnh, máy giặt bền bỉ và tiết kiệm điện từ chuyên gia Điện Lạnh Nghĩa Hà.",
};

import Pagination from "@/components/Pagination";

export const dynamic = 'force-dynamic';

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = parseInt(page || "1", 10);
  const limit = 6;
  const skip = (currentPage - 1) * limit;

  await dbConnect();
  const [data, total] = await Promise.all([
    Post.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
    Post.countDocuments()
  ]);
  const posts = JSON.parse(JSON.stringify(data));
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 md:pt-48 md:pb-20 overflow-hidden bg-primary/5 dark:bg-primary/5 border-b border-primary/10 dark:border-white/5">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-primary mb-6 uppercase leading-[1.1] drop-shadow-sm">
              <span className="inline-block">Tin Tức</span> <span className="text-gray-900 dark:text-white italic">&</span> <span className="inline-block">Kinh Nghiệm</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
              Chia sẻ những kiến thức hữu ích để bạn sử dụng thiết bị điện lạnh tại nhà một cách hiệu quả và tiết kiệm nhất.
            </p>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          {posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {posts.map((post: any) => (
                  <article key={post._id} className="group flex flex-col bg-white dark:bg-white/5 backdrop-blur-sm rounded-[40px] border border-gray-100 dark:border-white/10 shadow-premium overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20">
                    <Link href={`/blog/${post.slug}`} className="block aspect-video overflow-hidden relative">
                      {post.thumbnail ? (
                        <CldImage
                          src={post.thumbnail} 
                          alt={post.title} 
                          width={600}
                          height={400}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-200">
                          <FileText size={48} />
                        </div>
                      )}
                      <div className="absolute top-4 left-4 bg-primary text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                        Kinh Nghiệm
                      </div>
                    </Link>

                    <div className="p-8 flex flex-col grow">
                      <div className="flex items-center gap-4 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={12} className="text-primary" />
                          {new Date(post.createdAt).toLocaleDateString("vi-VN")}
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1.5">
                          <User size={12} className="text-primary" />
                          Admin
                        </div>
                      </div>

                      <Link href={`/blog/${post.slug}`}>
                        <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-4 line-clamp-3 min-h-[4.5rem] group-hover:text-primary transition-colors leading-tight">
                          {post.title}
                        </h2>
                      </Link>
                      
                      <p className="text-gray-500 dark:text-gray-400 font-medium mb-8 line-clamp-3 italic">
                        {post.metaDescription || "Mời bạn tham khảo bài viết chi tiết từ Điện Lạnh Nghĩa Hà..."}
                      </p>

                      <div className="mt-auto flex items-center justify-between group/btn">
                        <Link 
                          href={`/blog/${post.slug}`}
                          className="text-gray-900 dark:text-white font-black text-xs uppercase tracking-widest flex items-center gap-2"
                        >
                          Đọc thêm
                          <ChevronRight size={16} className="text-primary translate-x-0 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/blog" />
            </>
          ) : (
            <div className="text-center py-20 bg-gray-50 dark:bg-white/5 rounded-[40px] border border-dashed border-gray-200 dark:border-white/10">
              <p className="text-gray-400 font-bold italic">Bài viết đang được cập nhật. Vui lòng quay lại sau!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
