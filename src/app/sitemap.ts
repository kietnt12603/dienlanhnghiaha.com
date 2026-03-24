import { MetadataRoute } from 'next'
import dbConnect from '@/lib/db'
import { Service, Post } from '@/models'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://dienlanhnghiaha.com'
  
  await dbConnect()

  // Fetch all services and posts
  const [services, posts] = await Promise.all([
    Service.find({}, 'slug updatedAt'),
    Post.find({}, 'slug updatedAt')
  ])

  const serviceUrls = services.map((service) => ({
    url: `${baseUrl}/dich-vu/${service.slug}`,
    lastModified: service.updatedAt || new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/dich-vu`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/gioi-thieu`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...serviceUrls,
    ...postUrls,
    {
      url: `${baseUrl}/lien-he`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ]
}
