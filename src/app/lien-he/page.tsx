import { Metadata } from 'next';
import ContactContent from '@/components/ContactContent';

export const metadata: Metadata = {
  title: "Liên Hệ Điện Lạnh Nghĩa Hà - Sửa Chữa Nhanh Chóng 24/7",
  description: "Liên hệ Hotline: 0905.436.359 để được tư vấn sửa chữa máy lạnh, tủ lạnh, máy giặt tại Điện Bàn, Hội An, Đà Nẵng. Có mặt sau 30 phút, báo giá minh bạch.",
};

export default function ContactPage() {
  return <ContactContent />;
}
