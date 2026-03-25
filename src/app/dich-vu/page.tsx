import dbConnect from "@/lib/db";
import { Service } from "@/models";
import Link from "next/link";
import { ChevronRight, Snowflake, Zap, Droplets } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Danh Sách Dịch Vụ Điện Lạnh - Sửa Chữa Chuyên Nghiệp",
  description: "Tổng hợp các dịch vụ sửa chữa máy lạnh, tủ lạnh, máy giặt, điện nước tại Quảng Nam & Đà Nẵng. Báo giá công khai, thợ giỏi, bảo hành dài hạn.",
};

export default async function ServicesPage() {
  await dbConnect();
  const data = await Service.find().sort({ createdAt: -1 });
  const services = JSON.parse(JSON.stringify(data));

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Máy lạnh': return <Snowflake className="text-blue-500" size={24} />;
      case 'Tủ lạnh': return <Zap className="text-orange-500" size={24} />;
      case 'Máy giặt': return <Droplets className="text-blue-400" size={24} />;
      default: return <Zap className="text-primary" size={24} />;
    }
  };

  return (
    <div className="bg-white dark:bg-dark min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-xs font-black text-primary uppercase tracking-widest mb-6">
            Dịch vụ của chúng tôi
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-8 tracking-tight">
            Giải Pháp <span className="text-primary italic">Toàn Diện</span> Cho Thiết Bị Của Bạn
          </h1>
          <p className="text-lg text-gray-500 dark:text-slate-400 leading-relaxed font-medium">
            Điện Lạnh Nghĩa Hà cung cấp các giải pháp sửa chữa và bảo trì chuyên nghiệp, giúp thiết bị của bạn luôn hoạt động bền bỉ và hiệu quả nhất.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.length > 0 ? services.map((service: any) => (
            <Link 
              key={service._id} 
              href={`/dich-vu/${service.slug}`}
              className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-[40px] overflow-hidden border border-gray-100 dark:border-white/5 shadow-premium hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image Decor */}
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src={service.image || '/logo.png'} 
                  alt={service.name} 
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 flex items-center gap-2">
                  <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/20">
                    {service.category}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-10 grow flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-2xl group-hover:bg-primary/10 transition-colors">
                    {getCategoryIcon(service.category)}
                  </div>
                  <span className="text-xl font-black text-primary">{service.price}</span>
                </div>
                
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 transition-colors group-hover:text-primary">
                  {service.name}
                </h3>
                
                <p className="text-gray-500 dark:text-slate-400 text-sm line-clamp-3 mb-10 leading-relaxed font-medium">
                  {service.description.replace(/<[^>]*>/g, '')}
                </p>

                <div className="mt-auto flex items-center gap-2 text-sm font-black text-primary uppercase tracking-widest group-hover:gap-4 transition-all">
                  Chi tiết dịch vụ
                  <ChevronRight size={18} />
                </div>
              </div>
            </Link>
          )) : (
            <div className="col-span-full py-20 text-center">
              <div className="bg-gray-50 dark:bg-white/5 inline-flex p-10 rounded-[40px] mb-8">
                <Snowflake size={64} className="text-gray-300 animate-pulse" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4">Hiện chưa có dịch vụ nào</h3>
              <p className="text-gray-500 max-w-md mx-auto">Vui lòng quay lại sau hoặc liên hệ Hotline để được hỗ trợ trực tiếp.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
