import dbConnect from "@/lib/db";
import { Post } from "@/models";
import { notFound } from "next/navigation";
import { Calendar, Clock, ChevronLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from 'next';
import SEO from "@/components/SEO";
import ShareButtons from "@/components/ShareButtons";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  await dbConnect();
  const post = await Post.findOne({ slug });
  if (!post) return { title: "Không tìm thấy bài viết" };

  return {
    title: (post.metaTitle || post.title).split(' | ')[0],
    description: post.metaDescription,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      images: post.thumbnail ? [post.thumbnail] : [],
    }
  };
}

export const dynamic = 'force-dynamic';

export default async function BlogPostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await dbConnect();
  const post = await Post.findOne({ slug });
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pb-20">
      <SEO type="BlogPosting" data={post} />
      <article className="container mx-auto px-4 mt-24">
        <div className="max-w-4xl mx-auto">
          {/* Back & Share Utility Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-6 border-b border-gray-100 dark:border-white/5">
            <Link href="/blog" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-primary transition-colors group w-fit">
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Quay lại Blog
            </Link>
            
            <div className="flex items-center gap-4 bg-gray-50 dark:bg-white/5 px-6 py-3 rounded-2xl w-fit">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Chia sẻ bài viết</span>
              <ShareButtons title={post.title} />
            </div>
          </div>
          {/* Post Header */}
          <div className="space-y-8 mb-12">
            <div className="flex items-center gap-4 text-[10px] font-black text-primary uppercase tracking-widest">
              <span className="bg-primary/10 px-4 py-1.5 rounded-full tracking-[0.2em]">Kinh Nghiệm</span>
              <div className="flex items-center gap-1.5 text-gray-400">
                <Calendar size={12} />
                {new Date(post.createdAt).toLocaleDateString("vi-VN")}
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-[1.1] uppercase tracking-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 pt-4 border-t border-gray-100 dark:border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black">N</div>
                <div>
                  <p className="text-xs font-black text-gray-900 dark:text-white">Nghĩa Hà</p>
                  <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase">Tác giả</p>
                </div>
              </div>
              <div className="h-8 w-px bg-gray-100 dark:border-white/5" />
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <Clock size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">5 phút đọc</span>
              </div>
            </div>
          </div>

          {/* Thumbnail */}
          {post.thumbnail && (
            <div className="rounded-[40px] overflow-hidden mb-16 shadow-premium aspect-video relative group">
              <img 
                src={post.thumbnail} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
              />
            </div>
          )}

          {/* Content */}
          <div 
            className="prose prose-lg dark:prose-invert max-w-none 
              prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6
              prose-li:text-slate-600 dark:prose-li:text-slate-300 prose-li:font-medium
              prose-strong:text-slate-900 dark:prose-strong:text-white prose-strong:font-black
              prose-img:rounded-[32px]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Footer CTA */}
          <div className="mt-20 p-10 bg-linear-to-br from-primary to-blue-600 rounded-[40px] text-white overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl group-hover:scale-110 transition-transform duration-1000" />
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="max-w-md">
                <h3 className="text-2xl font-black mb-2 uppercase italic">Bạn Đang Gặp Vấn Đề Về Điện Lạnh?</h3>
                <p className="text-white/80 font-medium">Đội ngũ Nghĩa Hà luôn sẵn sàng hỗ trợ bạn 24/7 với dịch vụ uy tín và chất lượng nhất.</p>
              </div>
              <Link 
                href="/lien-he"
                className="bg-white text-primary px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform active:scale-95 whitespace-nowrap"
              >
                Liên hệ ngay
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
