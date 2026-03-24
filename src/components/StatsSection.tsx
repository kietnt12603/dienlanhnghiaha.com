'use client';

import { motion } from 'framer-motion';
import { Star, Calendar, Zap, Clock } from 'lucide-react';

export default function StatsSection() {
  const stats = [
    { label: 'Khách hàng hài lòng', value: '10,000+', icon: Star, color: 'text-yellow-500' },
    { label: 'Năm kinh nghiệm', value: '10+', icon: Calendar, color: 'text-blue-500' },
    { label: 'Kỹ thuật viên', value: '50+', icon: Zap, color: 'text-primary' },
    { label: 'Bảo hành lên đến', value: '12 Tháng', icon: Clock, color: 'text-red-500' },
  ];

  return (
    <section className="py-24 relative bg-(--section-bg)">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-8 rounded-3xl bg-(--card-bg) border border-(--card-border)"
            >
              <stat.icon className={`mx-auto mb-4 ${stat.color}`} size={32} />
              <div className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2">{stat.value}</div>
              <div className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
