'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Zap, 
  Snowflake, 
  Award, 
  TrendingUp, 
  ShieldCheck, 
  Users,
  LucideIcon
} from 'lucide-react';

interface DBService {
  _id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
}

interface ServiceGridProps {
  services: DBService[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

// Helper to map categories/names to icons and colors
const getServiceMeta = (name: string, category: string) => {
  const n = name.toLowerCase();
  const c = category.toLowerCase();

  if (n.includes('máy lạnh') || c.includes('máy lạnh')) {
    if (n.includes('vệ sinh')) return { Icon: Snowflake, color: 'bg-cyan-500' };
    return { Icon: Zap, color: 'bg-blue-500' };
  }
  if (n.includes('tủ lạnh') || c.includes('tủ lạnh')) {
    return { Icon: Award, color: 'bg-indigo-500' };
  }
  if (n.includes('máy giặt') || c.includes('máy giặt')) {
    return { Icon: TrendingUp, color: 'bg-blue-600' };
  }
  if (n.includes('lắp đặt')) {
    return { Icon: ShieldCheck, color: 'bg-blue-400' };
  }
  return { Icon: Users, color: 'bg-slate-700' };
};

// Clean HTML/Description to short text
const cleanDesc = (html: string) => {
  return html.replace(/<[^>]*>?/gm, '').slice(0, 100) + '...';
};

export default function ServiceGrid({ services }: ServiceGridProps) {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {services.map((service) => {
        const { Icon, color } = getServiceMeta(service.name, service.category);
        return (
          <Link key={service._id} href={`/dich-vu/${service.slug}`}>
            <motion.div
              variants={itemVariants}
              className="group h-full relative p-8 rounded-[32px] bg-(--card-bg) border border-(--card-border) hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover-lift"
            >
              <div className={`${color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                <Icon size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-black mb-4 text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">
                {service.name}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 font-medium leading-relaxed">
                {cleanDesc(service.description)}
              </p>
              <div className="flex items-center gap-2 text-primary font-black text-sm uppercase tracking-wider">
                Xem chi tiết
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.div>
              </div>
            </motion.div>
          </Link>
        );
      })}
    </motion.div>
  );
}
