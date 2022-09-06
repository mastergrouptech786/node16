import { ProductModel } from "./model/ProductModel.js";
import { connect } from "./model/product.js";

import data from "./Data/products.js";

async function hydrate() {
  await connect();

  const productsOlds = await ProductModel.find();
  if (productsOlds.length > 0) {
    for (const productsOld of productsOlds) {
      await productsOld.remove();
    }
  }

  for (const product of data) {
    const p = new ProductModel(product);
    await p.save();
  }
}

hydrate().then(console.log);
