import { MetadataRoute } from 'next';
import { getAllProducts, getAllCategories } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://pinventory-5hr5.vercel.app';
  
  const products = getAllProducts();
  const categories = getAllCategories();

  const productUrls = products.map((product: any) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const categoryUrls = categories.map((cat: any) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  const sectionUrls = ['men', 'women'].map((section) => ({
    url: `${baseUrl}/category/${section}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    ...sectionUrls,
    ...categoryUrls,
    ...productUrls,
  ];
}
