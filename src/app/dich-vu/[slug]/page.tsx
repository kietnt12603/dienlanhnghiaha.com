import dbConnect from "@/lib/db";
import { Service, Settings } from "@/models";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Phone, CheckCircle, ArrowLeft, MessageCircle, Star, ShieldCheck, Clock, BadgeCheck } from "lucide-react";
import Link from "next/link";
import SEO from "@/components/SEO";
import { CldImage } from "next-cloudinary";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getService(slug: string) {
  await dbConnect();
  const service = await Service.findOne({ slug });
  if (!service) return null;
  return JSON.parse(JSON.stringify(service));
}

async function getOtherServices(currentSlug: string) {
  await dbConnect();
  const services = await Service.find({ slug: { $ne: currentSlug } }).limit(5);
  return JSON.parse(JSON.stringify(services));
}

async function getSiteSettings() {
  await dbConnect();
  const settings = await Settings.findOne();
  return JSON.parse(JSON.stringify(settings)) || {};
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) return { title: "Dịch vụ Điện Lạnh Nghĩa Hà" };

  return {
    title: `${service.name} | Điện Lạnh Nghĩa Hà`,
    description: `Chuyên ${service.name.toLowerCase()} tại Điện Bàn, Hội An, Đà Nẵng. Thợ giỏi, có mặt sau 30 phút, cam kết linh kiện chính hãng, bảo hành dài hạn.`,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = await getService(slug);
  const otherServices = await getOtherServices(slug);
  const settings = await getSiteSettings();

  if (!service) notFound();

  // Data sync check for features
  const features = (service.features && service.features.length > 0) ? service.features : [
    "Kiểm tra tình trạng thiết bị",
    "Báo giá chi tiết trước khi làm",
    "Sửa chữa và thay thế linh kiện chính hãng",
    "Vệ sinh sạch sẽ sau khi sửa xong",
    "Phiếu bảo hành và hướng dẫn sử dụng"
  ];
  const cleanedPrice = service.price?.replace(/từ/gi, '').trim() || "Liên hệ";

  return (
    <div className="bg-white dark:bg-dark min-h-screen pt-32 pb-20">
      <SEO type="Service" data={service} />
      <div className="container mx-auto px-4">
        {/* Breadcrumb & Hero Section */}
        <div className="mb-20">
          <Link
            href="/dich-vu"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-primary transition-colors mb-10 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Quay lại Dịch vụ
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text & CTA */}
            <div className="order-2 lg:order-1">
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-8 tracking-tight leading-[1.1]">
                {service.name}
              </h1>
              <p className="text-xl text-gray-500 dark:text-slate-400 mb-10 leading-relaxed font-semibold">
                Dịch vụ chuyên nghiệp tại nhà khu vực Đà Nẵng, Quảng Nam. Thợ giỏi, uy tín, cam kết hài lòng 100%.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href={`tel:${settings.phone?.replace(/\./g, '') || "0905436359"}`}
                  className="bg-red-500 hover:bg-red-600 text-white px-10 py-5 rounded-[24px] font-black uppercase tracking-widest text-sm flex items-center gap-3 shadow-xl shadow-red-500/20 transition-all hover:-translate-y-1 active:scale-95"
                >
                  <Phone size={20} fill="currentColor" />
                  Gọi Ngay: {settings.phone || "0905.436.359"}
                </a>
                <a
                  href={settings.facebook || "https://zalo.me/0905436359"}
                  className="bg-[#0068ff] hover:bg-[#0052cc] text-white px-10 py-5 rounded-[24px] font-black uppercase tracking-widest text-sm flex items-center gap-3 shadow-xl shadow-blue-500/20 transition-all hover:-translate-y-1 active:scale-95"
                >
                  <MessageCircle size={20} fill="currentColor" />
                  Chat Zalo
                </a>
              </div>
            </div>

            {/* Right: Image & Price Badge */}
            <div className="order-1 lg:order-2 relative group">
              <div className="absolute inset-0 bg-primary/10 rounded-[60px] translate-x-4 translate-y-4 -z-10 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative rounded-[60px] overflow-hidden aspect-video lg:aspect-4/3 shadow-2xl border-4 border-white dark:border-white/5">
                <CldImage
                  src={service.image}
                  alt={service.name}
                  width={800}
                  height={600}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />

                {/* Price Badge */}
                <div className="absolute bottom-4 right-4 sm:bottom-10 sm:right-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl px-4 py-3 sm:px-8 sm:py-6 rounded-[24px] sm:rounded-[32px] text-center shadow-2xl border border-white/20 scale-100 sm:scale-110">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">Giá chỉ từ</p>
                  <p className="text-xl sm:text-2xl font-black text-primary uppercase">{cleanedPrice}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-16">
            {/* Features Checklist */}
            <section className="bg-gray-50/50 dark:bg-white/5 p-12 rounded-[50px] border border-gray-100 dark:border-white/5">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-10 flex items-center gap-4">
                <BadgeCheck className="text-primary" size={32} />
                Chi Tiết Dịch Vụ
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-4 bg-white dark:bg-slate-800 p-6 rounded-[24px] shadow-sm border border-gray-100 dark:border-white/5 transition-all hover:border-primary/30">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <CheckCircle size={20} className="text-primary" />
                    </div>
                    <span className="font-bold text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Why Choose Us Banner */}
            <section className="bg-primary rounded-[50px] p-12 text-white relative overflow-hidden group shadow-2xl shadow-primary/20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl transition-transform duration-1000 group-hover:scale-125" />
              <div className="relative z-10">
                <h2 className="text-3xl font-black mb-10">Tại sao chọn Nghĩa Hà?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { icon: <Star />, text: "Kỹ thuật viên tay nghề cao, tận tâm." },
                    { icon: <ShieldCheck />, text: "Linh kiện chính hãng 100%." },
                    { icon: <Clock />, text: "Có mặt nhanh chóng sau 30 phút." },
                    { icon: <BadgeCheck />, text: "Bảo hành dài hạn, chu đáo." }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 font-bold text-lg">
                      <div className="bg-white/20 p-2 rounded-xl">
                        {item.icon}
                      </div>
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Original HTML Description */}
            <section className="prose prose-lg dark:prose-invert max-w-none prose-h1:font-black prose-h2:font-black prose-h2:text-primary prose-h2:tracking-tight prose-h2:uppercase prose-h2:mt-16 prose-h2:mb-8 prose-p:leading-relaxed prose-li:font-medium">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-10 border-l-8 border-primary pl-6 py-2 uppercase tracking-tight">Thông tin chi tiết dịch vụ</h2>
              <div dangerouslySetInnerHTML={{ __html: service.description }} />
            </section>

            {/* Bottom Conversion CTA */}
            <section className="bg-linear-to-br from-primary to-blue-600 rounded-[50px] p-12 text-white relative overflow-hidden shadow-2xl shadow-primary/30">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full -ml-20 -mb-20 blur-3xl font-black" />

              <div className="relative z-10 text-center">
                <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">Đừng để hỏng hóc làm phiền bạn!</h3>
                <p className="text-blue-100 font-bold mb-12 text-lg max-w-2xl mx-auto">Liên hệ ngay với đội ngũ kỹ thuật của Điện Lạnh Nghĩa Hà để được tư vấn và hỗ trợ xử lý nhanh chóng trong 30 phút.</p>

                <div className="flex flex-wrap justify-center gap-6">
                  <a
                    href={`tel:${settings.phone?.replace(/\./g, '') || "0905436359"}`}
                    className="bg-white text-primary hover:bg-gray-50 px-12 py-6 rounded-[32px] font-black uppercase tracking-widest text-lg flex items-center gap-4 transition-all hover:-translate-y-2 hover:shadow-2xl shadow-white/10 active:scale-95 group"
                  >
                    <div className="bg-primary/10 p-2 rounded-xl group-hover:scale-110 transition-transform">
                      <Phone size={24} fill="currentColor" />
                    </div>
                    {settings.phone || "0905.436.359"}
                  </a>
                  <a
                    href={settings.facebook || "https://zalo.me/0905436359"}
                    className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-12 py-6 rounded-[32px] font-black uppercase tracking-widest text-lg flex items-center gap-4 transition-all hover:-translate-y-2 hover:shadow-2xl active:scale-95"
                  >
                    <MessageCircle size={24} fill="currentColor" />
                    Chat Zalo
                  </a>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-12">
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[50px] border border-gray-100 dark:border-white/5 shadow-premium">
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-8">Dịch Vụ Khác</h3>
              <div className="space-y-8">
                {otherServices.map((item: any) => (
                  <Link
                    key={item._id}
                    href={`/dich-vu/${item.slug}`}
                    className="flex items-center gap-5 group"
                  >
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0">
                      <CldImage 
                        src={item.image} 
                        alt={item.name} 
                        width={64}
                        height={64}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform" 
                      />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 dark:text-white group-hover:text-primary transition-colors line-clamp-1">{item.name}</h4>
                      <p className="text-sm font-bold text-primary">{item.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sidebar CTA */}
            <div className="bg-linear-to-br from-dark to-slate-800 p-10 rounded-[50px] text-white relative overflow-hidden shadow-2xl border border-white/5 group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16 blur-3xl group-hover:scale-150 transition-transform duration-1000" />
              <div className="relative z-10">
                <h4 className="text-2xl font-black mb-6 tracking-tight">Bạn cần thợ ngay?</h4>
                <p className="text-gray-400 font-medium mb-10 leading-relaxed">Đừng ngần ngại, hãy liên hệ với chúng tôi để được tư vấn và báo giá miễn phí ngay bây giờ.</p>
                <a
                  href={`tel:${settings.phone?.replace(/\./g, '') || "0905436359"}`}
                  className="w-full bg-linear-to-r from-primary to-blue-500 text-white py-6 rounded-[28px] font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-primary/40 transition-all hover:-translate-y-1 active:scale-95 shadow-xl shadow-primary/20"
                >
                  <Phone size={20} fill="currentColor" />
                  Gọi: {settings.phone || "0905.436.359"}
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom Related Services Section */}
        <div className="mt-32 pt-20 border-t border-gray-100 dark:border-white/5">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-primary font-black uppercase tracking-[0.2em] text-xs mb-4">Khám phá thêm</p>
              <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Dịch Vụ Liên Quan</h2>
            </div>
            <Link
              href="/dich-vu"
              className="text-sm font-black text-primary uppercase tracking-widest border-b-2 border-primary/20 hover:border-primary transition-all pb-1 mb-2"
            >
              Xem tất cả
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherServices.slice(0, 3).map((item: any) => (
              <Link
                key={item._id}
                href={`/dich-vu/${item.slug}`}
                className="group bg-gray-50 dark:bg-white/5 rounded-[40px] p-8 border border-gray-100 dark:border-white/5 hover:bg-white dark:hover:bg-slate-900 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative h-48 rounded-[32px] overflow-hidden mb-8">
                  <CldImage 
                    src={item.image} 
                    alt={item.name} 
                    width={400}
                    height={300}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                </div>
                <h4 className="text-2xl font-black text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors">{item.name}</h4>
                <p className="text-primary font-black">{item.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
