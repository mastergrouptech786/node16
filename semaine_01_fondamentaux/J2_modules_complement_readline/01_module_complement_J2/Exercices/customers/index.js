import products from "./Data/products.js";
import { priceTTC } from "./utils.js";
import "dotenv/config";

console.table(products);

const { COUNTRY, TVA, PRECISION } = process.env;

for (const product of products) {
  const { priceHT } = product;

  product.priceTTC = priceTTC({
    priceHT: priceHT,
    tva: TVA,
    precision: PRECISION,
  });
}

console.table(products);

products.map((p) => ({
  ...p,
  priceTTC: priceTTC({
    priceHT: p.priceHT,
    tva: TVA,
    precision: PRECISION,
  }),
}));

console.table(products);
