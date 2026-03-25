'use client';

import { createBooking } from '@/actions/booking';
import { Phone, Clock, ShieldCheck, CheckCircle2, MapPin, Zap, Star } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NextImage from 'next/image';

export default function Hero() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    const result = await createBooking(formData);
    setIsSubmitting(false);
    setMessage(result.message);
    if (result.success) {
      (document.getElementById('booking-form') as HTMLFormElement).reset();
      setTimeout(() => setMessage(null), 5000);
    }
  }

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-primary/10 dark:bg-primary/5 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-blue-400/10 dark:bg-blue-400/5 rounded-full blur-[100px]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-light/50 dark:bg-dark/20 rounded-full blur-[150px] -z-10" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/80 dark:bg-white/5 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold mb-8 shadow-sm border border-white/50 dark:border-white/10 text-primary dark:text-secondary"
            >
              <div className="w-2 h-2 bg-primary animate-ping rounded-full" />
              Sửa chữa siêu tốc trong 30 phút
            </motion.div>
            
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-slate-100 leading-[1.1] mb-8 tracking-tight">
              <span className="sr-only">Điện Lạnh Nghĩa Hà - Dịch vụ sửa chữa máy lạnh, tủ lạnh uy tín Quảng Nam & Đà Nẵng</span>
              Kỹ Thuật <br />
              <span className="text-gradient">
                Chuyên Nghiệp
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-xl leading-relaxed">
              Dịch vụ điện lạnh uy tín hàng đầu tại <span className="font-bold text-slate-900 dark:text-slate-100 border-b-2 border-primary/20">Quảng Nam & Đà Nẵng</span>. 
              Thợ tay nghề cao, linh kiện chính hãng, bảo hành dài hạn.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 mb-12">
              <motion.a 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="tel:0905436359"
                className="flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark text-white text-xl font-black px-12 py-5 rounded-2xl shadow-premium transition-all"
              >
                <Phone size={24} fill="white" />
                0905.436.359
              </motion.a>
              
              <div className="flex flex-col justify-center">
                <div className="flex -space-x-3 mb-2">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 bg-gray-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden shadow-sm"
                    >
                      <NextImage 
                        src={`https://i.pravatar.cc/100?u=tech${i}`} 
                        alt={`Kỹ thuật viên điện lạnh ${i}`} 
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                        priority
                      />
                    </motion.div>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400">
                  <div className="flex text-yellow-500">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                  </div>
                  <span>4.9/5 (2.5k+ Đánh giá)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8 p-6 bg-white/40 dark:bg-slate-900/50 backdrop-blur-sm rounded-[32px] border border-white/60 dark:border-white/10">
              {[
                { label: "Năm Kinh Nghiệm", val: "10+" },
                { label: "Phục Vụ Tận Nơi", val: "24/7" },
                { label: "Cam Kết Hài Lòng", val: "100%" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-3xl font-black text-primary mb-1">{item.val}</span>
                  <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-tight">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/10 rounded-[48px] rotate-3 scale-[1.02] blur-xl" />
            <div className="relative glass-card rounded-[40px] p-8 md:p-12 shadow-premium overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl" />
              
              <div className="relative z-10">
                <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-3 tracking-tight">Đặt Lịch Ngay</h2>
                <p className="text-gray-500 dark:text-slate-400 mb-10 text-sm font-medium">Báo giá minh bạch, không phát sinh chi phí ẩn.</p>
                
                <form id="booking-form" action={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="group">
                      <input 
                        name="customerName" 
                        type="text" 
                        placeholder="Họ và tên của bạn" 
                        required 
                        className="w-full px-6 py-5 bg-white/50 dark:bg-slate-800 dark:text-white border border-transparent dark:border-slate-700/50 focus:border-primary/20 dark:focus:border-primary/50 rounded-2xl outline-none transition-all font-semibold placeholder:text-gray-400 dark:placeholder:text-slate-500"
                      />
                    </div>
                    <div>
                      <input 
                        name="phone" 
                        type="tel" 
                        placeholder="Số điện thoại liên hệ" 
                        required 
                        className="w-full px-6 py-5 bg-white/50 dark:bg-slate-800 dark:text-white border border-transparent dark:border-slate-700/50 focus:border-primary/20 dark:focus:border-primary/50 rounded-2xl outline-none transition-all font-semibold placeholder:text-gray-400 dark:placeholder:text-slate-500"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <select 
                        name="address" 
                        required 
                        className="w-full px-6 py-5 bg-white/50 dark:bg-slate-800 dark:text-white border border-transparent dark:border-slate-700/50 focus:border-primary/20 dark:focus:border-primary/50 rounded-2xl outline-none transition-all font-semibold appearance-none cursor-pointer"
                      >
                        <option value="" className="dark:bg-slate-900">Chọn khu vực</option>
                        <option value="Điện Bàn" className="dark:bg-slate-900">Điện Bàn</option>
                        <option value="Hội An" className="dark:bg-slate-900">Hội An</option>
                        <option value="Đà Nẵng" className="dark:bg-slate-900">Đà Nẵng</option>
                      </select>
                      <select 
                        name="serviceType" 
                        required 
                        className="w-full px-6 py-5 bg-white/50 dark:bg-slate-800 dark:text-white border border-transparent dark:border-slate-700/50 focus:border-primary/20 dark:focus:border-primary/50 rounded-2xl outline-none transition-all font-semibold appearance-none cursor-pointer"
                      >
                        <option value="" className="dark:bg-slate-900">Chọn dịch vụ</option>
                        <option value="Sửa máy lạnh" className="dark:bg-slate-900">Sửa máy lạnh</option>
                        <option value="Sửa tủ lạnh" className="dark:bg-slate-900">Sửa tủ lạnh</option>
                        <option value="Sửa máy giặt" className="dark:bg-slate-900">Sửa máy giặt</option>
                        <option value="Khác" className="dark:bg-slate-900">Khác</option>
                      </select>
                    </div>
                  </div>
                  
                  <motion.button 
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className="w-full py-5 bg-primary hover:bg-primary-dark text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 group disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="animate-spin h-6 w-6 border-3 border-white border-t-transparent rounded-full" />
                    ) : (
                      <>
                        GỬI YÊU CẦU NGAY
                        <CheckCircle2 size={22} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </motion.button>

                  <AnimatePresence>
                    {message && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 bg-green-50 text-green-700 rounded-xl text-center text-sm font-bold border border-green-200 mt-2">
                          {message}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
