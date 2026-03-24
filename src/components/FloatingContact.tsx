'use client';

import { Phone, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function FloatingContact({ settings }: { settings?: any }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-100 flex flex-col gap-4">
      <AnimatePresence>
        {isVisible && (
          <>
            {/* Messenger Button */}
            <motion.a
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              href={settings?.messenger || "https://m.me/nghia.ha.5686"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 bg-[#0695FF] text-white rounded-full flex items-center justify-center shadow-2xl relative group"
              aria-label="Chat với chúng tôi qua Messenger"
            >
              <div className="absolute inset-0 bg-[#0695FF] rounded-full animate-ping opacity-20" />
              <svg 
                viewBox="0 0 24 24" 
                width="28" 
                height="28" 
                fill="currentColor"
              >
                <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.908 1.463 5.485 3.751 7.152.195.142.316.368.32.613l.023 2.25c.005.474.526.757.915.484l2.493-1.745a.65.65 0 0 1 .46-.118c.655.123 1.336.188 2.038.188 5.523 0 10-4.145 10-9.258C22 6.145 17.523 2 12 2zm1.026 12.338l-2.454-2.618-4.78 2.618 5.253-5.58 2.503 2.618 4.73-2.618-5.252 5.58z"/>
              </svg>
              <span className="absolute right-full mr-4 px-4 py-2 bg-dark text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Chat Messenger
              </span>
            </motion.a>
            {/* Zalo Button */}
            <motion.a
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              href={`https://zalo.me/${(settings?.phone || "0905436359").replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 bg-[#0068ff] text-white rounded-full flex items-center justify-center shadow-2xl relative group"
              aria-label="Chat với chúng tôi qua Zalo"
            >
              <div className="absolute inset-0 bg-[#0068ff] rounded-full animate-ping opacity-20" />
              <MessageCircle size={28} />
              <span className="absolute right-full mr-4 px-4 py-2 bg-dark text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Chat Zalo ngay
              </span>
            </motion.a>

            {/* Phone Button */}
            <motion.a
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              href={`tel:${(settings?.phone || "0905436359").replace(/\D/g, '')}`}
              className="w-14 h-14 bg-accent text-white rounded-full flex items-center justify-center shadow-2xl relative group hotline-pulse"
              aria-label="Gọi điện hotline 24/7"
            >
              <Phone size={28} fill="white" />
              <span className="absolute right-full mr-4 px-4 py-2 bg-dark text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Gọi: {settings?.phone || "0905.436.359"}
              </span>
            </motion.a>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
