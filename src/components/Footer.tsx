'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Snowflake, Star } from 'lucide-react';
import Link from 'next/link';
import NextImage from "next/image";

export default function Footer({ settings }: { settings?: any }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const districts = [
    'Thành phố Hội An',
    'Thị xã Điện Bàn',
    'Thành phố Đà Nẵng',
  ];

  const services = [
    { name: 'Sửa Chữa Máy Lạnh', href: '/dich-vu/sua-may-lanh' },
    { name: 'Sửa Chữa Tủ Lạnh', href: '/dich-vu/sua-tu-lanh' },
    { name: 'Vệ Sinh & Bảo Trì', href: '/dich-vu/ve-sinh-bao-tri' },
    { name: 'Sửa Chữa Máy Giặt', href: '/dich-vu/sua-may-giat' },
    { name: 'Lắp Đặt & Thi Công', href: '/dich-vu/lap-dat' },
    { name: 'Nạp Gas Máy Lạnh', href: '/dich-vu/nap-gas-lanh' },
  ];

  return (
    <footer className="bg-dark text-white pt-24 pb-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Brand Info */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-14 h-14">
                <NextImage 
                  src="/logo.png" 
                  alt="Logo Điện Lạnh Nghĩa Hà" 
                  width={56}
                  height={56}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black leading-none text-primary">
                  NGHĨA <span className="text-primary">HÀ</span>
                </span>
                <span className="text-[10px] font-extrabold text-gray-500 tracking-[0.15em] uppercase">
                  {settings?.phone || "0905.436.359"}
                </span>
              </div>
            </Link>
            <p className="text-gray-400 dark:text-slate-400 text-sm leading-loose font-medium">
              Đơn vị hàng đầu trong dịch vụ sửa chữa, bảo trì thiết bị điện lạnh tại Quảng Nam & Đà Nẵng. Chúng tôi cam kết chất lượng, bảo hành dài hạn và phục vụ tận tâm 24/7.
            </p>
            <div className="flex gap-4">
              {settings?.facebook && (
                <a 
                  href={settings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary transition-colors group"
                  aria-label="Theo dõi chúng tôi trên Facebook"
                >
                  <svg className="text-gray-400 group-hover:text-white fill-current" viewBox="0 0 24 24" width="18" height="18">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              {settings?.messenger && (
                <a 
                  href={settings.messenger}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#0695FF] transition-colors group"
                  aria-label="Chat với chúng tôi qua Messenger"
                >
                  <svg className="text-gray-400 group-hover:text-white fill-current" viewBox="0 0 24 24" width="18" height="18">
                    <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.908 1.463 5.485 3.751 7.152.195.142.316.368.32.613l.023 2.25c.005.474.526.757.915.484l2.493-1.745a.65.65 0 0 1 .46-.118c.655.123 1.336.188 2.038.188 5.523 0 10-4.145 10-9.258C22 6.145 17.523 2 12 2zm1.026 12.338l-2.454-2.618-4.78 2.618 5.253-5.58 2.503 2.618 4.73-2.618-5.252 5.58z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-lg font-black mb-8 text-white dark:text-slate-100 uppercase tracking-widest">Dịch vụ chính</h3>
            <ul className="space-y-4">
              {services.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-400 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors text-sm font-bold flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary transition-colors" />
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/blog" className="text-gray-400 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors text-sm font-bold flex items-center gap-2 group">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary transition-colors" />
                  Tin tức & Kinh nghiệm
                </Link>
              </li>
            </ul>
          </div>

          {/* Area Served */}
          <div>
            <h3 className="text-lg font-black mb-8 text-white dark:text-slate-100 uppercase tracking-widest">Khu vực phục vụ</h3>
            <ul className="space-y-4">
              {districts.map((area) => (
                <li key={area} className="text-gray-400 dark:text-slate-300 text-sm font-bold flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500/30 mt-1.5 shrink-0" />
                  {area}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-black mb-8 text-white dark:text-slate-100 uppercase tracking-widest">Liên hệ</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="bg-primary/20 p-2 rounded-lg text-primary">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs font-black text-gray-500 dark:text-slate-500 uppercase tracking-widest mb-1">Địa chỉ</p>
                  <p className="text-sm font-bold text-gray-300 dark:text-slate-200">{settings?.address || "KĐT An Phú Quý, Điện Bàn, Quảng Nam"}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="bg-accent/20 p-2 rounded-lg text-accent">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs font-black text-gray-500 dark:text-slate-500 uppercase tracking-widest mb-1">Hotline 24/7</p>
                  <p className="text-sm font-black text-white dark:text-slate-100">{settings?.phone || "0905.436.359"}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 dark:text-slate-500 text-xs font-bold uppercase tracking-widest">
            © {mounted ? new Date().getFullYear() : '2026'} Điện Lạnh Nghĩa Hà. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-gray-500 dark:text-slate-500 text-xs font-bold">
            <span>Thiết kế bởi</span>
            <span className="text-primary italic">Kiệt Nguyễn</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
