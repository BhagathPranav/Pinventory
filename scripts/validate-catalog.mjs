import fs from 'fs';
import path from 'path';

const root = process.cwd();
const productsPath = path.join(root, 'data', 'products.json');
const categoriesPath = path.join(root, 'data', 'categories.json');
const publicDir = path.join(root, 'public');

console.log('🔍 Auditing Pinventory Catalog Data...\n');

let errorCount = 0;
let warningCount = 0;

// 1. Read Data
if (!fs.existsSync(productsPath)) {
  console.error('❌ FATAL: data/products.json does not exist.');
  process.exit(1);
}

if (!fs.existsSync(categoriesPath)) {
  console.error('❌ FATAL: data/categories.json does not exist.');
  process.exit(1);
}

const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));

const productIds = new Set();
const categorySlugs = new Set(categories.map(c => c.slug));

// 2. Validate Categories
console.log(`📂 Validating ${categories.length} Categories...`);
for (const cat of categories) {
  if (!cat.slug || !cat.name || !cat.description) {
    console.error(`  ❌ Invalid Category entry: ${JSON.stringify(cat)}`);
    errorCount++;
  }
}

// 3. Validate Products
console.log(`\n📦 Validating ${products.length} Products...`);

for (const product of products) {
  const pId = product.id;

  // Duplicate ID check
  if (productIds.has(pId)) {
    console.error(`  ❌ Duplicate product ID: "${pId}"`);
    errorCount++;
  } else {
    productIds.add(pId);
  }

  // Mandatory fields check
  const requiredFields = ['id', 'name', 'price', 'amazonLink', 'image', 'section', 'category'];
  for (const field of requiredFields) {
    if (!product[field]) {
      console.error(`  ❌ Product [${pId || 'UNKNOWN'}] is missing field "${field}"`);
      errorCount++;
    }
  }

  // Image Asset existence check (if local image)
  if (product.image && product.image.startsWith('/')) {
    const localImgPath = path.join(publicDir, product.image);
    if (!fs.existsSync(localImgPath)) {
      console.error(`  ❌ Product [${pId}] image missing on disk: "${product.image}"`);
      errorCount++;
    }
  }

  // Amazon Associate Link check
  if (product.amazonLink && !product.amazonLink.includes('amzn.to') && !product.amazonLink.includes('amazon.')) {
    console.warn(`  ⚠️ Product [${pId}] amazonLink does not use amzn.to domain: "${product.amazonLink}"`);
    warningCount++;
  }

  // Section check
  if (product.section && !['men', 'women'].includes(product.section.toLowerCase())) {
    console.warn(`  ⚠️ Product [${pId}] section is "${product.section}". Standard sections are "men" or "women".`);
    warningCount++;
  }
}

// 4. Validate Cross-Selling Related Items
console.log('\n🔗 Validating Product Relationships (relatedItems)...');
for (const product of products) {
  if (product.relatedItems && Array.isArray(product.relatedItems)) {
    for (const rel of product.relatedItems) {
      if (!productIds.has(rel.id)) {
        console.error(`  ❌ Product [${product.id}] references non-existent related ID: "${rel.id}"`);
        errorCount++;
      }
    }
  }
}

// 5. Summary
console.log('\n----------------------------------------');
if (errorCount === 0) {
  console.log(`✅ CATALOG AUDIT PASSED! (${products.length} products, ${categories.length} categories, ${warningCount} warnings)`);
  process.exit(0);
} else {
  console.error(`❌ CATALOG AUDIT FAILED with ${errorCount} error(s) and ${warningCount} warning(s).`);
  process.exit(1);
}
