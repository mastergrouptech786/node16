import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  status : Boolean,
  count : { type : Number, default : 0}
});

export const UserModel = mongoose.model("users", UserSchema);
