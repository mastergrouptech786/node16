import products from "./products.js";


print("start----------------------")

db = db.getSiblingDB("shop");

const isExists = db.products.drop();

try {
  db.createCollection("products", {
    sale: Boolean,
    price: Number,
    society: String,
    qty: Number,
    size: { h: Number, w: Number, uom: String },
    year: Date
  });
  db.products.insertMany(products);

  db.createCollection("sales", {
    society: String,
    year: Date
  });

} catch (err) {
  print(err);
}
