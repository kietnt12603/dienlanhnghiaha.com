'use client';

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

export default function LayoutWrapper({ 
  children, 
  settings 
}: { 
  children: React.ReactNode;
  settings: any;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin') || pathname === '/login';

  if (isAdmin) {
    return <main>{children}</main>;
  }

  return (
    <>
      <Header settings={settings} />
      <main>{children}</main>
      <Footer settings={settings} />
      <FloatingContact settings={settings} />
    </>
  );
}
