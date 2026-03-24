'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, MapPin, Send, CheckCircle2, Zap } from 'lucide-react';
import SEO from "@/components/SEO";
import { createBooking } from "@/actions/booking";

export default function ContactContent() {
  const [formState, setFormState] = useState({
    customerName: '',
    phone: '',
    address: '',
    serviceType: 'Tư vấn chung'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const contactMethods = [
    {
      icon: <Phone size={24} />,
      title: "Hotline 24/7",
      value: "0905.436.359",
      href: "tel:0905436359",
      color: "blue"
    },
    {
      icon: <MessageCircle size={24} />,
      title: "Zalo Chat",
      value: "0905.436.359",
      href: "https://zalo.me/0905436359",
      color: "cyan"
    },
    {
      icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.908 1.463 5.485 3.751 7.152.195.142.316.368.32.613l.023 2.25c.005.474.526.757.915.484l2.493-1.745a.65.65 0 0 1 .46-.118c.655.123 1.336.188 2.038.188 5.523 0 10-4.145 10-9.258C22 6.145 17.523 2 12 2zm1.026 12.338l-2.454-2.618-4.78 2.618 5.253-5.58 2.503 2.618 4.73-2.618-5.252 5.58z"/></svg>,
      title: "Messenger",
      value: "Nghĩa Hà Messenger",
      href: "https://m.me/nghia.ha.5686",
      color: "messenger"
    },
    {
      icon: <MapPin size={24} />,
      title: "Địa Chỉ",
      value: "KĐT An Phú Quý, Điện Bàn, Quảng Nam",
      href: "https://maps.app.goo.gl/d15a06baaa497baf",
      color: "red"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('customerName', formState.customerName);
      formData.append('phone', formState.phone);
      formData.append('address', formState.address);
      formData.append('serviceType', formState.serviceType);

      const res = await createBooking(formData);
      if (res.success) {
        setIsSuccess(true);
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Có lỗi xảy ra, vui lòng liên hệ hotline.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-dark min-h-screen">
      <SEO type="Organization" data={{}} />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 rounded-l-[200px] -z-10 blur-3xl opacity-50" />
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest"
            >
              <Zap size={14} fill="currentColor" />
              Liên Hệ Ngay
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-dark dark:text-white leading-[1.1] uppercase tracking-tight italic"
            >
              Chúng Tôi Luôn <br />
              <span className="text-primary">Sẵn Sàng</span> Hỗ Trợ Bạn
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed max-w-2xl mx-auto"
            >
              Mọi sự cố về điện lạnh sẽ được đội ngũ Nghĩa Hà khắc phục nhanh chóng nhất. Hãy liên hệ với chúng tôi qua bất kỳ kênh nào dưới đây.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Grid & Form */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Contact Info */}
            <div className="lg:col-span-5 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                {contactMethods.map((method, idx) => (
                  <motion.a 
                    key={idx}
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-8 rounded-[40px] bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:shadow-premium transition-all duration-500 group flex items-start gap-6"
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 bg-primary/10 text-primary group-hover:scale-110 transition-transform`}>
                      {method.icon}
                    </div>
                    <div>
                      <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">{method.title}</h3>
                      <p className="text-lg font-black text-dark dark:text-white tracking-tight">{method.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-[50px] bg-gray-50 dark:bg-dark text-dark dark:text-white relative overflow-hidden shadow-premium dark:shadow-2xl border border-gray-100 dark:border-white/10"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -mr-32 -mt-32 opacity-50 dark:opacity-100" />
                
                {isSuccess ? (
                  <div className="text-center py-12 space-y-6 relative z-10">
                    <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 size={40} />
                    </div>
                    <h2 className="text-3xl font-black uppercase italic">Gửi Thành Công!</h2>
                    <p className="text-gray-500 dark:text-gray-400 font-medium italic">Cảm ơn bạn đã tin tưởng Nghĩa Hà. Chúng tôi sẽ liên hệ lại ngay trong vòng 30 phút.</p>
                    <button 
                      onClick={() => setIsSuccess(false)}
                      className="text-primary font-black uppercase tracking-widest text-sm hover:underline"
                    >
                      Gửi yêu cầu khác
                    </button>
                  </div>
                ) : (
                  <div className="relative z-10">
                    <h2 className="text-3xl font-black mb-2 uppercase tracking-tight italic text-dark dark:text-white">Yêu Cầu Dịch Vụ</h2>
                    <p className="text-gray-500 dark:text-gray-400 font-medium mb-10 italic text-sm">Điền thông tin của bạn để chúng tôi phục vụ nhanh nhất.</p>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-gray-400 dark:text-gray-500 ml-4 tracking-widest">Họ Tên Của Bạn</label>
                          <input 
                            required
                            type="text" 
                            placeholder="Ví dụ: Nguyễn Văn A"
                            className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-primary transition-colors text-dark dark:text-white"
                            value={formState.customerName}
                            onChange={(e) => setFormState({...formState, customerName: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-gray-400 dark:text-gray-500 ml-4 tracking-widest">Số Điện Thoại</label>
                          <input 
                            required
                            type="tel" 
                            placeholder="Ví dụ: 0905 XXX XXX"
                            className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-primary transition-colors text-dark dark:text-white"
                            value={formState.phone}
                            onChange={(e) => setFormState({...formState, phone: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 dark:text-gray-500 ml-4 tracking-widest">Khu Vực (Phường/Quận)</label>
                        <input 
                          required
                          type="text" 
                          placeholder="Ví dụ: Vĩnh Điện, Điện Bàn"
                            className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-primary transition-colors text-dark dark:text-white"
                          value={formState.address}
                          onChange={(e) => setFormState({...formState, address: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 dark:text-gray-500 ml-4 tracking-widest">Dịch Vụ Cần Tư Vấn</label>
                          <select 
                            className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-primary transition-colors appearance-none text-dark dark:text-white"
                            value={formState.serviceType}
                            onChange={(e) => setFormState({...formState, serviceType: e.target.value})}
                          >
                            <option value="Sửa Máy Lạnh" className="bg-white dark:bg-dark text-dark dark:text-white">Sửa Máy Lạnh</option>
                            <option value="Sửa Tủ Lạnh" className="bg-white dark:bg-dark text-dark dark:text-white">Sửa Tủ Lạnh</option>
                            <option value="Sửa Máy Giặt" className="bg-white dark:bg-dark text-dark dark:text-white">Sửa Máy Giặt</option>
                            <option value="Vệ Sinh Bảo Trì" className="bg-white dark:bg-dark text-dark dark:text-white">Vệ Sinh & Bảo Trì</option>
                            <option value="Tư vấn chung" className="bg-white dark:bg-dark text-dark dark:text-white">Khác/Tư vấn chung</option>
                          </select>
                      </div>
                      
                      <button 
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full bg-primary text-white py-6 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 shadow-2xl shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span className="animate-pulse">Đang gửi yêu cầu...</span>
                        ) : (
                          <>
                            <Send size={18} />
                            Gửi Yêu Cầu Ngay
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-32 container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-[60px] overflow-hidden shadow-premium border-8 border-gray-50 dark:border-white/5 h-[600px] relative group"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3836.2567150912328!2d108.25980651039555!3d15.9479647426097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314211002bae7277%3A0xd15a06baaa497baf!2zxJBp4buHbiBM4bqhbmggTmdoxKlhIEjDoA!5e0!3m2!1svi!2s!4v1774348767606!5m2!1svi!2s" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale hover:grayscale-0 transition-all duration-1000"
          ></iframe>
          <div className="absolute top-8 left-8 bg-white dark:bg-dark p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-white/10 hidden md:block max-w-[280px]">
            <h4 className="text-lg font-black text-dark dark:text-white mb-2 uppercase italic leading-tight">Vị trí của chúng tôi</h4>
            <div className="flex items-start gap-2 text-gray-500 dark:text-gray-400 text-sm font-medium">
              <MapPin size={16} className="text-primary shrink-0 mt-1" />
              <span>KĐT An Phú Quý, Điện Bàn, Quảng Nam (Ngay chân cầu Tứ Câu)</span>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
