import bcrypt from "bcrypt";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const UserModel = mongoose.model("users", UserSchema);

export async function  find({email, password}) {

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

export async function verif({email, password}) {
  // le findOne retourne un littéral
  const user = await UserModel.findOne({
    email : email
  }, {_id: 1, password: 1, name: 1, countConnect : 1 });

  if (user === undefined) return { _id: null, isAuth: false, name: null };

  // await => attend que l'asynchronisme de cet action se termine
  const match = await bcrypt.compare(password, user.password);

  if (match) {
    
    user.name = "ANTOINE"
    user.countConnect = user.countConnect + 1;
    console.log('ici' , user);

    return { _id : user._id,  isAuth: true, name: user.name };
  }

  return {  _id: null, isAuth: false, name: null };
}
