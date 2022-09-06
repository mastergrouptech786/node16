db = db.getSiblingDB("shop");

db.products.drop();
db.sales.drop();

db.createCollection("products", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["sale", "price", "society", "qty", "size", "year"],
      properties: {
        _id: { bsonType: "objectId" },
        sale: { bsonType: "bool" },
        price: { bsonType: "number" },
        society: { bsonType: "string" },
        qty: { bsonType: "number" },
        size: {
          bsonType: "object",
          properties: {
            h: { bsonType: "number" },
            w: { bsonType: "number" },
            uom: { bsonType: "string" },
          },
        },
        year: { bsonType: "number" },
      },
    },
  },
});

db.createCollection("sales", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["society", "year"],
      properties: {
        _id: { bsonType: "objectId" },
        society: { bsonType: "string" },
        year: { bsonType: "number" },
      },
    },
  },
});

db.products.insertMany([
  {
    sale: true,
    price: 0.99,
    society: "Alex",
    qty: 19,
    size: { h: 11, w: 29, uom: "cm" },
    year: 2019,
  },
  {
    sale: false,
    price: 1.99,
    society: "Alan",
    qty: 25,
    size: { h: 14, w: 21, uom: "cm" },
    year: 2019,
  },
  {
    sale: true,
    price: 1.5,
    society: "Albert",
    qty: 50,
    size: { h: 8.5, w: 11, uom: "in" },
    year: 2019,
  },
  {
    sale: true,
    price: 7.99,
    society: "Alice",
    qty: 100,
    size: { h: 8.5, w: 11, uom: "in" },
    year: 2020,
  },
  {
    sale: true,
    price: 2.99,
    society: "Sophie",
    qty: 75,
    size: { h: 22.85, w: 30, uom: "cm" },
    year: 2017,
  },
  {
    sale: false,
    price: 0.99,
    society: "Phil",
    qty: 45,
    size: { h: 10, w: 15.25, uom: "cm" },
    year: 2018,
  },
  {
    sale: true,
    price: 4.99,
    society: "Nel",
    qty: 19,
    size: { h: 10, w: 21, uom: "cm" },
    year: 2019,
  },
  {
    sale: true,
    price: 4.99,
    society: "Alexis",
    qty: 15,
    size: { h: 17, w: 20, uom: "cm" },
    year: 2019,
  },
  {
    sale: false,
    price: 5.99,
    society: "Sonia",
    qty: 100,
    size: { h: 14, w: 21, uom: "cm" },
    year: 2020,
  },
]);