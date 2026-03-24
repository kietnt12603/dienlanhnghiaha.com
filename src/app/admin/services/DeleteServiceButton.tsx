'use client';

import { Trash2 } from "lucide-react";
import { deleteService } from "@/actions/admin";
import { useState } from "react";

export default function DeleteServiceButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm("Bạn có chắc chắn muốn xóa dịch vụ này?")) {
      setIsDeleting(true);
      const res = await deleteService(id);
      if (!res.success) {
        alert("Lỗi khi xóa dịch vụ");
        setIsDeleting(false);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`p-3 rounded-2xl transition-all ${
        isDeleting 
          ? "bg-gray-100 text-gray-300" 
          : "bg-gray-50 dark:bg-white/5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30"
      }`}
      title="Xóa"
    >
      <Trash2 size={18} />
    </button>
  );
}
