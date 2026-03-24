import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import LayoutWrapper from "@/components/LayoutWrapper";
import { getSettings } from "@/actions/admin";

const beVietnamPro = Be_Vietnam_Pro({ 
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://dienlanhnghiaha.com'),
  title: {
    default: "Điện Lạnh Nghĩa Hà - Sửa Máy Lạnh Tại Điện Bàn, Hội An, Đà Nẵng",
    template: "%s | Điện Lạnh Nghĩa Hà"
  },
  description: "Dịch vụ sửa chữa máy lạnh, tủ lạnh, máy giặt uy tín tại Điện Bàn, Hội An, Duy Xuyên, Đà Nẵng. Thợ giỏi, có mặt sau 30 phút, giá rẻ, linh kiện chính hãng.",
  keywords: ["sửa máy lạnh điện bàn", "sửa tủ lạnh hội an", "sửa máy giặt đà nẵng", "vệ sinh máy lạnh điện bàn", "điện lạnh nghĩa hà"],
  authors: [{ name: 'Điện Lạnh Nghĩa Hà' }],
  creator: 'Điện Lạnh Nghĩa Hà',
  publisher: 'Điện Lạnh Nghĩa Hà',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Điện Lạnh Nghĩa Hà - Sửa Chữa Điện Lạnh Chuyên Nghiệp',
    description: 'Dịch vụ điện lạnh uy tín hàng đầu tại Quảng Nam & Đà Nẵng. Thợ tay nghề cao, phục vụ tận tâm 24/7.',
    url: 'https://dienlanhnghiaha.com',
    siteName: 'Điện Lạnh Nghĩa Hà',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Điện Lạnh Nghĩa Hà - Dịch vụ uy tín',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Điện Lạnh Nghĩa Hà - Sửa Chữa Điện Lạnh Chuyên Nghiệp',
    description: 'Dịch vụ điện lạnh uy tín hàng đầu tại Quảng Nam & Đà Nẵng. Thợ tay nghề cao, phục vụ tận tâm 24/7.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import SEO from "@/components/SEO";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <SEO 
          type="LocalBusiness" 
          data={{ 
            image: "https://dienlanhnghiaha.com/logo.png",
            // Settings already handled inside SEO component defaults for Organization/LocalBusiness
          }} 
        />
      </head>
      <body className={beVietnamPro.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <LayoutWrapper settings={settings}>
            {children}
          </LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
