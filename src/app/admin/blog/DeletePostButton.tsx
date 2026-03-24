'use client';

import { Trash2 } from "lucide-react";
import { deletePost } from "@/actions/admin";
import { useState } from "react";

export default function DeletePostButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
      setIsDeleting(true);
      const res = await deletePost(id);
      if (!res.success) {
        alert("Lỗi khi xóa bài viết");
        setIsDeleting(false);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`p-4 rounded-2xl transition-all ${
        isDeleting 
          ? "bg-gray-100 text-gray-300" 
          : "bg-gray-50 dark:bg-white/5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30"
      }`}
      title="Xóa"
    >
      <Trash2 size={20} />
    </button>
  );
}
