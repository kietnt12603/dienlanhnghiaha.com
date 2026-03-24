'use client';

import { useState } from 'react';
import { updateBookingStatus, deleteBooking } from '@/actions/admin';
import { Trash2, User, MapPin, Phone, Calendar } from 'lucide-react';

interface BookingRowProps {
  booking: any;
}

export default function BookingRow({ booking }: BookingRowProps) {
  const [status, setStatus] = useState(booking.status);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);
    const res = await updateBookingStatus(booking._id, newStatus);
    if (res.success) {
      setStatus(newStatus);
    } else {
      alert('Lỗi khi cập nhật trạng thái');
    }
    setIsUpdating(false);
  };

  const handleDelete = async () => {
    if (confirm('Bạn có chắc chắn muốn xóa yêu cầu này?')) {
      setIsDeleting(true);
      const res = await deleteBooking(booking._id);
      if (!res.success) {
        alert('Lỗi khi xóa');
        setIsDeleting(false);
      }
    }
  };

  if (isDeleting) return null;

  return (
    <tr className="group hover:bg-gray-50/50 dark:hover:bg-white/2 transition-all duration-300">
      <td className="p-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-50 dark:bg-white/5 rounded-xl text-gray-400">
            <Calendar size={18} />
          </div>
          <div>
            <p className="text-sm font-black text-gray-900 dark:text-white">
              {new Date(booking.createdAt).toLocaleDateString('vi-VN')}
            </p>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
              {new Date(booking.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      </td>
      
      <td className="p-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 font-black text-gray-900 dark:text-white">
            <User size={14} className="text-primary" />
            {booking.customerName}
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600">
            <Phone size={12} />
            {booking.phone}
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
            <MapPin size={12} />
            {booking.address}
          </div>
        </div>
      </td>

      <td className="p-6">
        <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">
          {booking.serviceType}
        </span>
      </td>

      <td className="p-6 text-center">
        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          disabled={isUpdating}
          className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl border-none outline-none cursor-pointer shadow-sm transition-all hover:scale-105 ${
            status === 'Mới' ? 'bg-orange-100 text-orange-600' : 
            status === 'Đang xử lý' ? 'bg-blue-100 text-blue-600' :
            'bg-green-100 text-green-600'
          }`}
        >
          <option value="Mới">Khách Mới</option>
          <option value="Đang xử lý">Đang Sửa</option>
          <option value="Hoàn thành">Xong</option>
        </select>
      </td>

      <td className="p-6 text-right">
        <button
          onClick={handleDelete}
          className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"
          title="Xóa"
        >
          <Trash2 size={20} />
        </button>
      </td>
    </tr>
  );
}
