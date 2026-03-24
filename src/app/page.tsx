import dbConnect from '@/lib/db';
import { Service } from '@/models';
import Hero from '@/components/Hero';
import ServiceGrid from '@/components/ServiceGrid';
import ProcessSection from '@/components/ProcessSection';
import StatsSection from '@/components/StatsSection';
import { Zap } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getServices() {
  await dbConnect();
  const services = await Service.find().lean();
  return JSON.parse(JSON.stringify(services));
}

export default async function Home() {
  const services = await getServices();

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Services Section */}
      <section id="services" className="py-32 relative overflow-hidden bg-[var(--section-bg)]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-black mb-6 uppercase tracking-widest">
              <Zap size={14} fill="currentColor" />
              Dịch vụ hàng đầu
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-100 mb-8 tracking-tight">
              Giải Pháp <span className="text-primary">Toàn Diện</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">
              Với hơn 10 năm kinh nghiệm, chúng tôi tự tin xử lý mọi sự cố điện lạnh từ dân dụng đến công nghiệp nhanh chóng, chuyên nghiệp và bảo hành dài hạn.
            </p>
          </div>

          <ServiceGrid services={services} />
        </div>
      </section>

      <ProcessSection />
      <StatsSection />
    </div>
  );
}
