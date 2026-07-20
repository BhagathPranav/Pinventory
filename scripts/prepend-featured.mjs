import fs from 'fs';
import path from 'path';

const root = process.cwd();
const productsPath = path.join(root, 'data', 'products.json');

const newFeaturedItems = [
  {
    "id": "salava-women-cotton-floral-printed-short-kurti",
    "name": "SALAVA Women Cotton Floral Printed Short Kurti",
    "price": "₹349",
    "amazonLink": "https://link.amazon/B0iHdLlDJ",
    "image": "https://m.media-amazon.com/images/I/71uLwjBwB+L._SL1254_.jpg",
    "section": "women",
    "category": "apparel",
    "relatedItems": [
      {
        "id": "w-for-woman-rust-red-floral-printed-chanderi-kurta-set",
        "relationship": "Pairs perfectly with",
        "type": "apparel"
      }
    ]
  },
  {
    "id": "w-for-woman-rust-red-floral-printed-chanderi-kurta-set",
    "name": "W for Woman Rust Red Floral Printed Chanderi Kurta Set",
    "price": "₹5,999",
    "amazonLink": "https://link.amazon/B03P5Wt6W",
    "image": "https://m.media-amazon.com/images/I/71V3QdUs1-L._SL1500_.jpg",
    "section": "women",
    "category": "apparel",
    "relatedItems": [
      {
        "id": "mindmore-cotton-anarkali-kurti-with-palazzo-set",
        "relationship": "Complete the look with",
        "type": "apparel"
      }
    ]
  },
  {
    "id": "mindmore-cotton-anarkali-kurti-with-palazzo-set",
    "name": "MINDMORE Cotton Anarkali Kurti with Palazzo Set",
    "price": "₹849",
    "amazonLink": "https://link.amazon/B0bPJPSBm",
    "image": "https://m.media-amazon.com/images/I/41PRdXq3Y5L.jpg",
    "section": "women",
    "category": "apparel",
    "relatedItems": [
      {
        "id": "salava-women-cotton-floral-printed-short-kurti",
        "relationship": "You might also like",
        "type": "apparel"
      }
    ]
  }
];

const existingProducts = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// Filter out any previous dummy items or existing entries for these IDs / links
const targetLinks = newSet(['https://link.amazon/B0iHdLlDJ', 'https://link.amazon/B03P5Wt6W', 'https://link.amazon/B0bPJPSBm']);
function newSet(arr) { return new Set(arr); }

const existingFiltered = existingProducts.filter(
  (p) => !targetLinks.has(p.amazonLink) && !newFeaturedItems.some((n) => n.id === p.id)
);

const updatedProducts = [...newFeaturedItems, ...existingFiltered];

fs.writeFileSync(productsPath, JSON.stringify(updatedProducts, null, 2), 'utf8');

console.log(`✅ Successfully updated catalog with exact real Amazon details! Total products: ${updatedProducts.length}`);
