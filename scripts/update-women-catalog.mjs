import fs from 'fs';
import path from 'path';

const root = process.cwd();
const productsPath = path.join(root, 'data', 'products.json');

const newTenItems = [
  {
    "id": "nenavoloc-cotton-embroidered-a-line-kurta",
    "name": "NENAVOLOC Cotton Embroidered A-Line Kurta",
    "price": "₹799",
    "amazonLink": "https://link.amazon/B05JaIXs7",
    "image": "https://m.media-amazon.com/images/I/611PFFKIBAL._SL1254_.jpg",
    "section": "women",
    "category": "apparel"
  },
  {
    "id": "classy-closet-cotton-embroidery-printed-kurti",
    "name": "Classy Closet Cotton Embroidery Printed Kurti",
    "price": "₹449",
    "amazonLink": "https://link.amazon/B09KGCMse",
    "image": "https://m.media-amazon.com/images/I/71LEm41w2ML._SL1500_.jpg",
    "section": "women",
    "category": "apparel"
  },
  {
    "id": "javima-viscose-rayon-floral-printed-short-kurti",
    "name": "JAVIMA Viscose Rayon Floral Printed Short Kurti",
    "price": "₹299",
    "amazonLink": "https://link.amazon/B09PtahjJ",
    "image": "https://m.media-amazon.com/images/I/51Pq+SSoCyL._SL1080_.jpg",
    "section": "women",
    "category": "apparel"
  },
  {
    "id": "rangmanch-pantaloons-blue-indigo-tunic-top",
    "name": "Rangmanch by Pantaloons Blue Indigo Tunic Top",
    "price": "₹629",
    "amazonLink": "https://link.amazon/B09it7w0S",
    "image": "https://m.media-amazon.com/images/I/61fFU3BhzZL._SL1500_.jpg",
    "section": "women",
    "category": "tops"
  },
  {
    "id": "priyashi-white-rayon-printed-kurta-salwar-set",
    "name": "Priyashi White Rayon Printed Kurta Salwar Set",
    "price": "₹699",
    "amazonLink": "https://link.amazon/B0gtqfIFR",
    "image": "https://m.media-amazon.com/images/I/61dmHBbIkNL._SL1500_.jpg",
    "section": "women",
    "category": "apparel"
  },
  {
    "id": "kriolax-peach-banarasi-suit-set-with-dupatta",
    "name": "kriolax Peach Banarasi Suit Set with Dupatta",
    "price": "₹1,999",
    "amazonLink": "https://link.amazon/B0fpDaRez",
    "image": "https://m.media-amazon.com/images/I/6158c5epGqL._SL1280_.jpg",
    "section": "women",
    "category": "apparel"
  },
  {
    "id": "pink-fort-casual-solid-linen-blend-relaxed-top",
    "name": "Pink Fort Casual Solid Linen Blend Relaxed Top",
    "price": "₹1,262",
    "amazonLink": "https://link.amazon/B00EKPEN9",
    "image": "https://m.media-amazon.com/images/I/419WXVymq7L.jpg",
    "section": "women",
    "category": "tops"
  },
  {
    "id": "khushal-k-pure-cotton-kurta-palazzo-dupatta-set",
    "name": "Khushal K Pure Cotton Kurta Palazzo Dupatta Set",
    "price": "₹1,549",
    "amazonLink": "https://link.amazon/B08ttDaYo",
    "image": "https://m.media-amazon.com/images/I/61faP9SVnYL._SL1500_.jpg",
    "section": "women",
    "category": "apparel"
  },
  {
    "id": "anni-designer-viscose-embroidered-short-kurti-green",
    "name": "ANNI Designer Viscose Embroidered Short Kurti in Green",
    "price": "₹499",
    "amazonLink": "https://link.amazon/B0eriL8H8",
    "image": "https://m.media-amazon.com/images/I/61IUZcZYegL._SL1440_.jpg",
    "section": "women",
    "category": "apparel"
  },
  {
    "id": "tee-projekt-muslin-anarkali-kurta-set-with-dupatta",
    "name": "Tee Projekt Muslin Anarkali Kurta Set with Dupatta",
    "price": "₹849",
    "amazonLink": "https://link.amazon/B0euTy1cK",
    "image": "https://m.media-amazon.com/images/I/81T825V+pwL._SL1500_.jpg",
    "section": "women",
    "category": "apparel"
  }
];

const existingProducts = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// Retain previous real Amazon women items
const realAmazonWomenIds = new Set([
  'salava-women-cotton-floral-printed-short-kurti',
  'w-for-woman-rust-red-floral-printed-chanderi-kurta-set',
  'mindmore-cotton-anarkali-kurta-with-palazzo-set'
]);

// Filter out ALL test women items
const cleanedProducts = existingProducts.filter((p) => {
  if (p.section === 'women') {
    return realAmazonWomenIds.has(p.id);
  }
  return true;
});

const allRealWomenItems = [
  ...cleanedProducts.filter((p) => realAmazonWomenIds.has(p.id)),
  ...newTenItems
];

// Setup reciprocal related items among real women items
allRealWomenItems.forEach((item, idx) => {
  const nextItem = allRealWomenItems[(idx + 1) % allRealWomenItems.length];
  item.relatedItems = [
    {
      id: nextItem.id,
      relationship: "Pairs perfectly with",
      type: nextItem.category
    }
  ];
});

const menProducts = cleanedProducts.filter((p) => p.section === 'men');
const finalProducts = [...allRealWomenItems, ...menProducts];

// Build set of valid product IDs
const validIds = new Set(finalProducts.map((p) => p.id));

// Clean up any dangling relatedItems in Men items that pointed to removed test women items
finalProducts.forEach((p) => {
  if (p.relatedItems) {
    p.relatedItems = p.relatedItems.filter((rel) => validIds.has(rel.id));
    if (p.relatedItems.length === 0) {
      // Fallback related item to another valid product
      const fallback = finalProducts.find((other) => other.id !== p.id && other.section === p.section) || finalProducts[0];
      if (fallback) {
        p.relatedItems = [
          {
            id: fallback.id,
            relationship: "Pairs perfectly with",
            type: fallback.category
          }
        ];
      }
    }
  }
});

fs.writeFileSync(productsPath, JSON.stringify(finalProducts, null, 2), 'utf8');

console.log(`✅ Cleaned catalog! Removed 50 test women items and fixed relatedItem references.`);
console.log(`✨ Total products in catalog: ${finalProducts.length} (${allRealWomenItems.length} Real Women Amazon items, ${menProducts.length} Men items)`);
