import users from "../Data/users.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export function find(email, password) {
  const user = users.find(
    (user) => (user.email === email) & (user.password === password)
  );

  if (user) {
    const { name, email, id } = user;

    return { name, email, id };
  }

  return null;
}

export async function verif(email, password) {
  const user = users.find((user) => user.email === email);

  if (user === undefined) return { isAuth: false, name: null };

  // await => attend que l'asynchronisme de cet action se termine
  const match = await bcrypt.compare(password, user.password);

  console.log(match);
  console.log(user.password);

  if (match) {
    return { isAuth: true, name: user.name };
  }

  return { isAuth: false, name: null };
}

export async function connect() {

  const init = await mongoose.connect('mongodb://root:example@127.0.0.1:27017/login', { useNewUrlParser: true, useUnifiedTopology: true });

  const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
  });

  const UserModel = mongoose.model("users", UserSchema);

}
