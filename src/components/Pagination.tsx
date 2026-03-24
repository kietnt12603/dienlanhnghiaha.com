import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  if (totalPages <= 1) return null;

  // Simple pagination: 1 2 3 ...
  // For larger sets, we might want more complex logic, but usually for a blog 1-5 is fine.
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-2 mt-12 mb-8">
      {currentPage > 1 ? (
        <Link
          href={`${baseUrl}?page=${currentPage - 1}`}
          className="p-3 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 text-gray-400 hover:text-primary hover:border-primary/50 transition-all shadow-sm"
          title="Trang trước"
        >
          <ChevronLeft size={20} />
        </Link>
      ) : (
        <div className="p-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent text-gray-200 cursor-not-allowed">
          <ChevronLeft size={20} />
        </div>
      )}

      <div className="flex items-center gap-2">
        {pages.map((page) => (
          <Link
            key={page}
            href={`${baseUrl}?page=${page}`}
            className={`w-12 h-12 flex items-center justify-center rounded-2xl font-black transition-all ${
              currentPage === page
                ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-110'
                : 'bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 text-gray-500 hover:text-primary hover:border-primary/50'
            }`}
          >
            {page}
          </Link>
        ))}
      </div>

      {currentPage < totalPages ? (
        <Link
          href={`${baseUrl}?page=${currentPage + 1}`}
          className="p-3 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 text-gray-400 hover:text-primary hover:border-primary/50 transition-all shadow-sm"
          title="Trang sau"
        >
          <ChevronRight size={20} />
        </Link>
      ) : (
        <div className="p-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent text-gray-200 cursor-not-allowed">
          <ChevronRight size={20} />
        </div>
      )}
    </div>
  );
}
