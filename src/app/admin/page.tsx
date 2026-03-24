import dbConnect from "@/lib/db";
import { Booking } from "@/models";
import BookingRow from "./BookingRow";
import SeedButton from "./SeedButton";
import { Users, Clock, CheckCircle2, ListFilter } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  await dbConnect();
  const data = await Booking.find().sort({ createdAt: -1 });
  const bookings = JSON.parse(JSON.stringify(data));

  const stats = [
    { 
      label: "Tổng yêu cầu", 
      value: bookings.length, 
      icon: <Users size={24} />, 
      color: "bg-blue-500",
      lightColor: "bg-blue-50 text-blue-600"
    },
    { 
      label: "Yêu cầu mới", 
      value: bookings.filter((b: any) => b.status === "Mới").length, 
      icon: <Clock size={24} />, 
      color: "bg-orange-500",
      lightColor: "bg-orange-50 text-orange-600"
    },
    { 
      label: "Đã hoàn thành", 
      value: bookings.filter((b: any) => b.status === "Hoàn thành").length, 
      icon: <CheckCircle2 size={24} />, 
      color: "bg-green-500",
      lightColor: "bg-green-50 text-green-600"
    },
  ];

  return (
    <div className="space-y-10">
      {/* Stats Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-gray-100 dark:border-white/5 shadow-premium flex items-center gap-6">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${stat.lightColor}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-gray-900 dark:text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Area */}
      <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-gray-100 dark:border-white/5 shadow-premium overflow-hidden">
        <div className="p-8 border-b border-gray-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-xl font-black text-gray-900 dark:text-white">Danh Sách Yêu Cầu</h2>
            <p className="text-sm text-gray-500 font-medium">Cập nhật lúc {new Date().toLocaleTimeString('vi-VN')}</p>
          </div>
          <div className="flex items-center gap-3">
            <SeedButton />
            <button className="flex items-center gap-2 bg-gray-50 dark:bg-white/5 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 dark:text-slate-400 hover:bg-gray-100 transition-colors">
              <ListFilter size={18} />
              Bộ lọc
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-white/2">
                <th className="p-6 font-black text-xs text-gray-400 uppercase tracking-widest">Thời gian</th>
                <th className="p-6 font-black text-xs text-gray-400 uppercase tracking-widest">Khách hàng</th>
                <th className="p-6 font-black text-xs text-gray-400 uppercase tracking-widest">Dịch vụ</th>
                <th className="p-6 font-black text-xs text-gray-400 uppercase tracking-widest text-center">Trạng thái</th>
                <th className="p-6 font-black text-xs text-gray-400 uppercase tracking-widest text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {bookings.length > 0 ? bookings.map((b: any) => (
                <BookingRow key={b._id} booking={b} />
              )) : (
                <tr>
                  <td colSpan={5} className="p-20 text-center">
                    <div className="flex flex-col items-center">
                      <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-full mb-4 text-gray-300">
                        <Users size={48} />
                      </div>
                      <p className="text-gray-500 font-bold italic">Chưa có khách hàng nào đặt lịch.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
