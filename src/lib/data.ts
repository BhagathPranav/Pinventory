import fs from 'fs';
import path from 'path';

const productsFilePath = path.join(process.cwd(), 'data', 'products.json');
const categoriesFilePath = path.join(process.cwd(), 'data', 'categories.json');

export interface RelatedItem {
  id: string;
  relationship: string;
  type: string;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  amazonLink: string;
  image: string;
  section: string;
  category: string;
  relatedItems?: RelatedItem[];
}

export interface Category {
  slug: string;
  name: string;
  description: string;
}

export function getAllProducts(): Product[] {
  const fileContents = fs.readFileSync(productsFilePath, 'utf8');
  return JSON.parse(fileContents);
}

export function getProductById(id: string): Product | undefined {
  const products = getAllProducts();
  return products.find((product: Product) => product.id === id);
}

export function getAllCategories(): Category[] {
  const fileContents = fs.readFileSync(categoriesFilePath, 'utf8');
  return JSON.parse(fileContents);
}
