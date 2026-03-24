'use client';

import { Share2 } from "lucide-react";

interface ShareButtonsProps {
  title: string;
}

export default function ShareButtons({ title }: ShareButtonsProps) {
  const shareOnFacebook = () => {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'noopener,noreferrer');
  };

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: url,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        alert('Đã sao chép liên kết vào bộ nhớ tạm!');
      } catch (err) {
        console.error('Error copying:', err);
      }
    }
  };

  return (
    <div className="flex gap-2">
      <button 
        onClick={shareOnFacebook}
        className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white hover:scale-110 transition-transform shadow-lg shadow-blue-600/20"
        title="Chia sẻ lên Facebook"
      >
        <svg className="fill-current" viewBox="0 0 24 24" width="14" height="14">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </button>
      <button 
        onClick={handleShare}
        className="w-8 h-8 flex items-center justify-center rounded-lg bg-white dark:bg-white/10 text-gray-700 dark:text-white hover:scale-110 transition-transform shadow-premium border border-gray-100 dark:border-white/5"
        title="Chia sẻ bài viết"
      >
        <Share2 size={14} />
      </button>
    </div>
  );
}
