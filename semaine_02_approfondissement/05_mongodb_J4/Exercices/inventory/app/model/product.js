import mongoose from "mongoose";
import { ProductModel } from "./PorductMode.js";

export async function connect() {
  const conn = await mongoose.connect("mongodb://root:example@mongo:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export async function all() {
  const conn = await connect();

  const products = await ProductModel.find();

  return products;
}

export async function find(name) {
  const conn = await connect();

  const product = await ProductModel.findOne({ society: name });

  return product;
}

export async function remove(name) {
  const conn = await connect();
  const product = await ProductModel.deleteOne({ society: name });

  return null;
}
