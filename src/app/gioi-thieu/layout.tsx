import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Giới Thiệu | Điện Lạnh Nghĩa Hà - Uy Tín & Chuyên Nghiệp",
  description: "Tìm hiểu về Điện Lạnh Nghĩa Hà - Đơn vị hàng đầu trong dịch vụ sửa chữa, bảo trì thiết bị điện lạnh tại Quảng Nam & Đà Nẵng với hơn 10 năm kinh nghiệm.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
