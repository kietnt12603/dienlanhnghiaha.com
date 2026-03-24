import dbConnect from "@/lib/db";
import { Service } from "@/models";
import Link from "next/link";
import { Edit, Trash2, Plus, Wrench } from "lucide-react";
import DeleteServiceButton from "./DeleteServiceButton";

export const dynamic = 'force-dynamic';

export default async function AdminServicesPage() {
  await dbConnect();
  const data = await Service.find().sort({ createdAt: -1 });
  const services = JSON.parse(JSON.stringify(data));

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Quản Lý Dịch Vụ</h1>
          <p className="text-sm text-gray-500 font-medium">Thêm, sửa hoặc xóa các dịch vụ của cửa hàng</p>
        </div>
        <Link 
          href="/admin/services/new" 
          className="bg-primary text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:scale-105 active:scale-95"
        >
          <Plus size={20} />
          Thêm dịch vụ mới
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.length > 0 ? services.map((service: any) => (
          <div key={service._id} className="bg-white dark:bg-slate-900 rounded-[32px] border border-gray-100 dark:border-white/5 shadow-premium overflow-hidden group hover:border-primary/50 transition-all duration-500">
            <div className="aspect-video w-full overflow-hidden bg-gray-100 dark:bg-white/5 relative">
              {service.image ? (
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <Wrench size={48} />
                </div>
              )}
              <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-primary border border-white/20">
                {service.category}
              </div>
            </div>

            <div className="p-8">
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 line-clamp-1">{service.name}</h3>
              <p className="text-sm text-gray-500 font-medium line-clamp-2 mb-6 h-10">{service.description.replace(/<[^>]*>/g, '')}</p>
              
              <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-white/5">
                <span className="text-primary font-black text-lg">{service.price}</span>
                <div className="flex items-center gap-2">
                  <Link 
                    href={`/admin/services/${service._id}`}
                    className="p-3 bg-gray-50 dark:bg-white/5 rounded-2xl text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all"
                    title="Sửa"
                  >
                    <Edit size={18} />
                  </Link>
                  <DeleteServiceButton id={service._id} />
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-20 bg-white dark:bg-slate-900 rounded-[40px] border border-dashed border-gray-200 dark:border-white/10 flex flex-col items-center justify-center text-gray-400">
            <div className="bg-gray-50 dark:bg-white/5 p-8 rounded-full mb-4">
              <Wrench size={64} />
            </div>
            <p className="font-bold italic">Chưa có dịch vụ nào. Hãy thêm dịch vụ đầu tiên!</p>
          </div>
        )}
      </div>
    </div>
  );
}
