import bcrypt from "bcrypt";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const UserModel = mongoose.model("users", UserSchema);

export async function  find(email, password) {

  const users =  await UserModel.find({
    email : email, 
    password : password
  }, {
    _id:0, 
    password: 0 
  });

  if (user) {
    const { name, email, id } = user;

    return { name, email, id };
  }

  return null;
}

export async function verif(email, password) {
  const user = await UserModel.findOne({
    email : email
  }, {_id:0, password: 1, name: 1 });

  if (user === undefined) return { isAuth: false, name: null };

  // await => attend que l'asynchronisme de cet action se termine
  const match = await bcrypt.compare(password, user.password);

  if (match) {
    return { isAuth: true, name: user.name };
  }

  return { isAuth: false, name: null };
}