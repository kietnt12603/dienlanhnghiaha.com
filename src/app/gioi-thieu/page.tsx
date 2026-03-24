import { Metadata } from 'next';
import AboutContent from '@/components/AboutContent';

export const metadata: Metadata = {
  title: "Giới Thiệu Về Điện Lạnh Nghĩa Hà - 10 Năm Kinh Nghiệm Sửa Chữa",
  description: "Tìm hiểu về đội ngũ Điện Lạnh Nghĩa Hà. 10 năm kinh nghiệm sửa chữa máy lạnh, tủ lạnh, máy giặt tại Điện Bàn, Hội An, Đà Nẵng. Uy tín, tận tâm, chất lượng.",
};

export default function AboutPage() {
  return <AboutContent />;
}
