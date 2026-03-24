'use client';

import React from 'react';
import { ShieldCheck, Zap, Heart, Award, CheckCircle2, Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from "@/components/SEO";
import Image from "next/image";

export default function AboutContent() {
  const coreValues = [
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Uy Tín Hàng Đầu",
      description: "Chúng tôi coi trọng chữ Tín hơn vàng. Mọi cam kết với khách hàng đều được thực hiện nghiêm túc và trách nhiệm.",
      color: "blue"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Tốc Độ & Kịp Thời",
      description: "Có mặt trong vòng 30 phút. Chúng tôi thấu hiểu sự bất tiện khi thiết bị hỏng hóc và luôn ưu tiên xử lý nhanh nhất.",
      color: "yellow"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Tận Tâm Phục Vụ",
      description: "Phục vụ bằng cả trái tim. Đội ngũ kỹ thuật viên luôn lắng nghe và đưa ra giải pháp tối ưu nhất cho túi tiền của bạn.",
      color: "red"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Chất Lượng Chính Hãng",
      description: "100% linh kiện thay thế là hàng chính hãng, có nguồn gốc rõ ràng và bảo hành dài hạn lên đến 12 tháng.",
      color: "green"
    }
  ];

  return (
    <div className="bg-white dark:bg-dark min-h-screen">
      <SEO type="Organization" data={{}} />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 rounded-l-[100px] -z-10 blur-3xl opacity-50" />
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Về Chúng Tôi
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-dark dark:text-white leading-[1.1] uppercase tracking-tight"
            >
              Điện Lạnh <span className="text-primary italic">Nghĩa Hà</span> <br />
              Chữ Tâm Trong Từng Dịch Vụ
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed max-w-2xl mx-auto"
            >
              Với hơn 10 năm kinh nghiệm trong ngành điện lạnh, chúng tôi tự hào là đơn vị tin cậy của hàng nghìn hộ gia đình và doanh nghiệp tại Quảng Nam & Đà Nẵng.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50 dark:bg-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group lg:pr-8"
            >
              <div className="absolute -inset-4 bg-primary/20 rounded-[40px] blur-2xl group-hover:bg-primary/30 transition-colors" />
              <Image 
                src="/gioi-thieu.png" 
                alt="Đội ngũ Nghĩa Hà chuyên nghiệp" 
                width={800}
                height={500}
                className="relative rounded-[32px] shadow-2xl w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-8 right-0 bg-white dark:bg-slate-900 p-8 rounded-[32px] shadow-xl border border-gray-100 dark:border-white/10 hidden md:block max-w-xs">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary/20 p-3 rounded-2xl text-primary font-black text-2xl">10+</div>
                  <div className="font-black text-dark dark:text-white uppercase leading-tight">Năm Kinh Nghiệm</div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium italic">"Chất lượng dịch vụ là kim chỉ nam cho mọi hoạt động của Nghĩa Hà."</p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-black text-dark dark:text-white uppercase tracking-tight italic">Hành Trình Khởi Nghiệp</h2>
              <div className="space-y-6 text-gray-600 dark:text-gray-300 font-medium leading-loose">
                <p>
                  Khởi đầu từ một cửa hàng nhỏ tại Điện Ngọc, Quảng Nam, **Điện Lạnh Nghĩa Hà** được thành lập với mong muốn mang đến giải pháp sửa chữa điện lạnh minh bạch, trung thực cho người dân quê hương.
                </p>
                <p>
                  Chúng tôi hiểu rằng thiết bị điện lạnh là "lá phổi" của mỗi ngôi nhà. Một chiếc điều hòa không mát hay tủ lạnh hỏng trong cái nắng miền Trung oi bức là nỗi ám ảnh. Vì vậy, tôn chỉ của chúng tôi là **"Nhanh - Uy tín - Tận tâm"**.
                </p>
                <p>
                  Đến nay, Nghĩa Hà đã xây dựng được đội ngũ kỹ thuật viên lành nghề, phục vụ rộng khắp từ các xã vùng xa của Quảng Nam đến các quận trung tâm Đà Nẵng.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6 pt-6">
                {[
                  "Thợ tay nghề cao",
                  "Giá cả minh bạch",
                  "Linh kiện chính hãng",
                  "Bảo hành dài hạn"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-primary w-5 h-5" />
                    <span className="font-bold text-dark dark:text-white">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-4xl font-black text-dark dark:text-white uppercase tracking-tight">Giá Trị Cốt Lõi</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
            <p className="text-gray-500 dark:text-gray-400 font-medium">Những nguyên tắc vàng giúp chúng tôi nhận được sự tin yêu của khách hàng trong suốt thập kỷ qua.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-[40px] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:shadow-premium transition-all duration-500 hover:-translate-y-2 group"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-primary/10 text-primary group-hover:scale-110 transition-transform`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-black text-dark dark:text-white mb-4 uppercase">{value.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed italic">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas Section */}
      <section className="py-24 bg-dark text-white rounded-[60px] mx-4 mb-20 overflow-hidden relative shadow-2xl">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black mb-16 uppercase tracking-tight italic"
          >
            Phủ Sóng Rộng Khắp
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[
              { city: "Hội An", area: "Tất cả các phường" },
              { city: "Điện Bàn", area: "Toàn thị xã" },
              { city: "Đà Nẵng", area: "Toàn Thành Phố" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-4"
              >
                <div className="text-primary text-4xl font-black tracking-tighter">{item.city}</div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{item.area}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-32 container mx-auto px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto p-12 md:p-24 bg-linear-to-br from-primary to-blue-700 rounded-[60px] text-white relative overflow-hidden group shadow-3xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl group-hover:scale-110 transition-transform duration-1000" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-8 uppercase tracking-tight italic">Sẵn Sàng Đồng Hành Cùng Bạn!</h2>
            <p className="text-xl text-white/90 font-medium mb-16 max-w-3xl mx-auto italic">
              Đừng để cái nóng hay việc hỏng hóc thiết bị làm phiền cuộc sống của bạn. Hãy liên hệ với chúng tôi để nhận tư vấn và báo giá miễn phí.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="tel:0905436359"
                className="bg-white text-primary px-12 py-6 rounded-[28px] font-black uppercase tracking-widest text-sm flex items-center gap-3 shadow-2xl"
              >
                <Phone size={20} fill="currentColor" />
                0905.436.359
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://zalo.me/0905436359"
                className="bg-blue-400 text-white border border-white/20 px-12 py-6 rounded-[28px] font-black uppercase tracking-widest text-sm flex items-center gap-3 backdrop-blur-sm"
              >
                <MessageCircle size={20} fill="currentColor" />
                Chat Zalo
              </motion.a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
