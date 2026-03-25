'use client';

import { motion } from 'framer-motion';
import { Phone, Zap, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

const steps = [
  {
    title: 'Tiếp Nhận Thông Tin',
    desc: 'Lắng nghe yêu cầu, tư vấn giải pháp sơ bộ và đặt lịch hẹn linh hoạt theo thời gian của bạn.',
    icon: <Phone size={32} />
  },
  {
    title: 'Kiểm Tra & Báo Giá',
    desc: 'Kỹ thuật viên đến tận nơi kiểm tra kỹ lưỡng, bắt đúng bệnh và báo giá minh bạch trước khi làm.',
    icon: <Zap size={32} />
  },
  {
    title: 'Tiến Hành Sửa Chữa',
    desc: 'Thực hiện sửa chữa chuyên nghiệp, sử dụng linh kiện chính hãng và đảm bảo an toàn kỹ thuật.',
    icon: <ShieldCheck size={32} />
  },
  {
    title: 'Bàn Giao & Bảo Hành',
    desc: 'Kiểm tra hoạt động trước khi bàn giao, dọn dẹp sạch sẽ và ghi phiếu bảo hành dài hạn.',
    icon: <CheckCircle2 size={32} />
  }
];

export default function ProcessSection() {
  return (
    <section className="py-32 relative bg-dark text-white overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                 <span className="text-white">Quy trình làm việc</span> <br />
                <span className="text-gradient">Chuyên nghiệp & Tận tâm</span>
              </h2>
              <div className="space-y-8">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-6 group">
                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-primary/20 dark:bg-primary border border-white/10 flex items-center justify-center text-xl font-black text-primary dark:text-white group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-black mb-2 text-white dark:text-slate-100">{step.title}</h4>
                      <p className="text-gray-400 dark:text-slate-300 font-medium">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10 rounded-[40px] overflow-hidden border border-white/10 shadow-2xl"
            >
                <Image 
                  src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070&auto=format&fit=crop" 
                  alt="Kỹ thuật viên đang làm việc" 
                  width={800}
                  height={600}
                  className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                />
              <div className="absolute inset-0 bg-linear-to-t from-dark via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-8 left-8 right-8 p-6 glass-card rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                    <Zap size={24} fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-widest text-primary">Cam kết</p>
                    <p className="font-bold text-white">Phục vụ trong vòng 30 phút</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
