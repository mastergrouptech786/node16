import bcrypt from "bcrypt";
import mongoose from "mongoose";

import { UserModel } from "./UserMode.js";

export async function connect() {
  const conn = await mongoose.connect("mongodb://root:example@mongo:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export async function find(id) {
  const conn = await connect();
  const user = await UserModel.findOne({ _id: id }, { password: 0 });

  return {
    name: user.name,
    email: user.email,
    _id: user._id,
    count: user.count,
  };
}

export async function verif({ email, password }) {
  const conn = await connect();
  // le findOne retourne un littéral
  const user = await UserModel.findOne({
    email: email,
  });

  if (user === undefined)
    return { _id: null, isAuth: false, name: null, count: 0 };

  // await => attend que l'asynchronisme de cet action se termine
  const match = await bcrypt.compare(password, user.password);

  if (match) {
    user.count = user.count + 1;
    await user.save();

    return {
      _id: user._id,
      isAuth: true,
      name: user.name,
      count: user.count,
    };
  }

  return { _id: null, isAuth: false, name: null, count: 0 };
}
