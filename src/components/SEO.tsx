import { 
  Organization, 
  LocalBusiness, 
  Service, 
  BlogPosting, 
  WithContext,
  PostalAddress,
  ContactPoint,
  GeoCoordinates,
  City
} from 'schema-dts';

interface SEOProps {
  type: 'Organization' | 'LocalBusiness' | 'Service' | 'BlogPosting';
  data: any;
}

export default function SEO({ type, data }: SEOProps) {
  const baseUrl = 'https://dienlanhnghiaha.com';
  
  // Thông tin cơ sở để tái sử dụng
  const name = 'Điện Lạnh Nghĩa Hà';
  const logo = `${baseUrl}/logo.png`;
  const telephone = '+84-905-436-359';
  const sameAs = ['https://www.facebook.com/dienlanhnghiaha'];

  const address: PostalAddress = {
    '@type': 'PostalAddress',
    streetAddress: 'Thế Lữ, Điện Ngọc',
    addressLocality: 'Điện Bàn',
    addressRegion: 'Quảng Nam',
    postalCode: '560000',
    addressCountry: 'VN',
  };

  const geo: GeoCoordinates = {
    '@type': 'GeoCoordinates',
    latitude: 15.9479596,
    longitude: 108.2623868,
  };

  const contactPoint: ContactPoint = {
    '@type': 'ContactPoint',
    telephone: telephone,
    contactType: 'customer service',
    areaServed: ['Hội An', 'Điện Bàn', 'Đà Nẵng'],
    availableLanguage: ['Vietnamese'],
  };

  let jsonLd: WithContext<Organization | LocalBusiness | Service | BlogPosting> | null = null;

  switch (type) {
    case 'Organization':
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name,
        url: baseUrl,
        logo,
        sameAs,
        contactPoint,
      };
      break;

    case 'LocalBusiness':
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name,
        url: baseUrl,
        logo,
        image: data?.image || `${baseUrl}/hero-bg.jpg`,
        telephone,
        priceRange: '$$',
        address,
        geo,
        openingHours: 'Mo-Su 00:00-23:59',
        hasMap: 'https://www.google.com/maps?cid=15065444876615810479',
        sameAs,
      };
      break;

    case 'Service':
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: data?.name,
        description: data?.description?.replace(/<[^>]*>/g, '').slice(0, 160),
        provider: {
          '@type': 'LocalBusiness',
          name,
          address,
          telephone,
          image: logo,
        },
        areaServed: [
          { '@type': 'City', name: 'Hội An' } as City,
          { '@type': 'City', name: 'Điện Bàn' } as City,
          { '@type': 'City', name: 'Đà Nẵng' } as City,
        ],
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${baseUrl}/dich-vu/${data?.slug}`,
        },
        offers: {
          '@type': 'Offer',
          url: `${baseUrl}/dich-vu/${data?.slug}`,
          priceCurrency: 'VND',
          price: data?.price?.replace(/\D/g, '') || '0',
          availability: 'https://schema.org/InStock',
          seller: {
            '@type': 'LocalBusiness',
            name,
          },
        },
      };
      break;

    case 'BlogPosting':
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: data?.title,
        description: data?.metaDescription,
        image: data?.thumbnail,
        datePublished: data?.createdAt,
        dateModified: data?.updatedAt || data?.createdAt,
        author: {
          '@type': 'Person',
          name: 'Nghĩa Hà',
          url: baseUrl,
        },
        publisher: {
          '@type': 'Organization',
          name,
          logo: {
            '@type': 'ImageObject',
            url: logo,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${baseUrl}/blog/${data?.slug}`,
        },
      };
      break;
  }

  if (!jsonLd) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}