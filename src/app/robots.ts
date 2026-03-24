import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/login/', '/private/'],
    },
    sitemap: 'https://dienlanhnghiaha.com/sitemap.xml',
  }
}
