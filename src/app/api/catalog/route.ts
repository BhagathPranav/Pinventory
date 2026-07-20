import { NextResponse } from 'next/server';
import { getAllProducts, Product } from '@/lib/data';

function escapeCSV(val: string): string {
  const cleanVal = (val || '').trim();
  const escaped = cleanVal.replace(/"/g, '""');
  return `"${escaped}"`;
}

export async function GET() {
  try {
    const products: Product[] = getAllProducts();
    
    const headers = 'id,title,description,link,image_link,price,availability,condition';
    const csvRows = [headers];

    for (const product of products) {
      const id = product.id;
      const title = product.name;
      const description = product.name;
      const link = `https://pinventory-5hr5.vercel.app/product/${product.id}`;
      const image_link = product.image.startsWith('http') 
        ? product.image 
        : `https://pinventory-5hr5.vercel.app${product.image}`;
      
      const priceValue = product.price.replace(/[^0-9.]/g, '');
      const price = `${priceValue} INR`;
      const availability = 'in stock';
      const condition = 'new';

      const row = [
        escapeCSV(id),
        escapeCSV(title),
        escapeCSV(description),
        escapeCSV(link),
        escapeCSV(image_link),
        escapeCSV(price),
        escapeCSV(availability),
        escapeCSV(condition)
      ];
      csvRows.push(row.join(','));
    }

    const csvString = csvRows.join('\n');

    return new NextResponse(csvString, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="catalog.csv"'
      }
    });
  } catch (error) {
    console.error('Error generating catalog feed:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
