import mongoose from "mongoose";
import { ProductModel } from "./ProductModel.js";

import * as dotenv from "dotenv";
dotenv.config();
const { DB_PASSWORD, DB_NAME, DB_LOGIN, DB_PORT } = process.env;

export async function connect() {
  const conn = await mongoose.connect(`mongodb://${DB_LOGIN}:${DB_PASSWORD}@mongo:${DB_PORT}/?authSource=admin`, {
    dbName: DB_NAME,
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
