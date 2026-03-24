'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Sun, Moon, Zap } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function Header({ settings }: { settings?: any }) {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Dịch vụ', href: '/dich-vu' },
    { name: 'Giới thiệu', href: '/gioi-thieu' },
    { name: 'Tin tức', href: '/blog' },
    { name: 'Liên hệ', href: '/lien-he' },
  ];

  // Prevent hydration mismatch
  const currentTheme = mounted ? theme : 'light';
  const showDarkHeader = mounted && (isScrolled || currentTheme === 'dark');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? 'py-2' : 'py-6'
        }`}
    >
      <div className="container mx-auto px-4">
        <nav className={`relative flex items-center justify-between px-4 sm:px-6 py-3 rounded-[24px] transition-all duration-500 ${isScrolled
            ? 'glass-card shadow-premium'
            : 'bg-transparent'
          }`}>
          {/* Logo container - minimal space */}
          <div className="flex-none">
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group relative z-[110]">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 transition-transform duration-500 group-hover:scale-110 flex-none">
                <img
                  src="/logo.png"
                  alt="Logo Điện Lạnh Nghĩa Hà"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className={`text-lg sm:text-2xl font-black leading-[0.9] transition-colors duration-300 ${showDarkHeader ? 'text-primary dark:text-primary' : 'text-primary'
                  }`}>
                  NGHĨA <span className="text-primary">HÀ</span>
                </span>
                <span className={`hidden sm:flex text-[10px] font-extrabold transition-colors duration-300 ${showDarkHeader ? 'text-gray-500 dark:text-gray-400' : 'text-gray-500'
                  } tracking-[0.12em] uppercase mt-1 leading-none`}>
                  {settings?.phone || "0905.436.359"}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav - Centered with flexible space */}
          <div className="hidden lg:flex flex-1 justify-center">
            <div className="flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-black uppercase tracking-widest transition-all duration-300 hover:text-primary relative group whitespace-nowrap ${showDarkHeader ? 'text-dark dark:text-gray-300' : 'text-dark'
                    }`}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side - fixed space */}
          <div className="flex-none flex items-center justify-end gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
              className={`p-2 rounded-xl transition-all duration-300 ${showDarkHeader
                  ? 'bg-gray-100 dark:bg-white/10 text-dark dark:text-white'
                  : 'bg-white/10 text-dark hover:bg-white/20'
                }`}
              aria-label="Toggle Dark Mode"
            >
              {mounted && (currentTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />)}
              {!mounted && <div className="w-5 h-5" />}
            </button>

            {/* CTA Button */}
            <div className="hidden sm:block">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`tel:${(settings?.phone || "0905.436.359").replace(/\D/g, '')}`}
                className="flex items-center gap-2 bg-dark dark:bg-primary text-white px-5 xl:px-7 py-3 rounded-xl font-black text-xs xl:text-sm shadow-xl hover:bg-primary transition-all duration-300 whitespace-nowrap"
              >
                <div className="bg-white/20 p-1 rounded-md">
                  <Phone size={14} fill="white" />
                </div>
                {settings?.phone || "0905.436.359"}
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden relative z-[120] p-2 rounded-xl transition-colors ${showDarkHeader ? 'text-dark dark:text-white hover:bg-gray-100 dark:hover:bg-white/10' : 'text-dark hover:bg-white/10'
                }`}
              aria-label={isMobileMenuOpen ? "Đóng menu" : "Mở menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </nav>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-dark/60 backdrop-blur-md lg:hidden z-[110]"
            />
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-4 right-4 bottom-4 w-[85%] max-w-sm bg-white dark:bg-slate-900 rounded-[40px] shadow-2xl z-[120] p-6 sm:p-10 flex flex-col lg:hidden overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl" />

              <div className="flex items-center justify-between mb-12 relative">
                <div className="flex items-center gap-2">
                  <div className="bg-primary p-2 rounded-lg">
                    <Zap className="text-white" size={20} fill="white" />
                  </div>
                  <span className="font-black text-dark dark:text-white text-xl tracking-tight">MENU</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-3 bg-gray-100 dark:bg-white/10 rounded-2xl hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-500 transition-colors"
                  aria-label="Đóng menu"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col space-y-2 sm:space-y-4 relative">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-2xl sm:text-3xl font-black text-dark dark:text-white hover:text-primary transition-colors block py-2"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="pt-8"
                >
                    <a
                      href={`tel:${(settings?.phone || "0905.436.359").replace(/\D/g, '')}`}
                      className="flex flex-col items-center justify-center gap-2 sm:gap-3 bg-primary text-white py-6 sm:py-8 rounded-[32px] font-black text-xl sm:text-2xl shadow-2xl shadow-primary/30 hotline-pulse"
                    >
                    <div className="bg-white/20 p-3 rounded-full">
                      <Phone size={32} fill="white" />
                    </div>
                    <span>{settings?.phone || "0905.436.359"}</span>
                    <span className="text-xs font-bold text-white/60 uppercase tracking-widest mt-1">Gọi ngay để được tư vấn</span>
                  </a>
                </motion.div>
              </div>

              <div className="mt-auto text-center relative">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Điện Lạnh Nghĩa Hà © 2024</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
