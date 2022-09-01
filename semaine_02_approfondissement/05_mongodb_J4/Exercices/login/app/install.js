import mongoose from "mongoose";

async function connect() {
    const init = await mongoose.connect(
      "mongodb://root:example@mongo:27017",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  
    const UserSchema = new mongoose.Schema({
      name: String,
      email: String,
      password: String,
    });
  
    const UserModel = mongoose.model("users", UserSchema);
  
    const Alice = new UserModel({
      name: "alice",
      email: "alice.alice@gmail.com",
      password: "$2b$10$U9vzshXE7s4GFqz4JPmSzuvIiblImQXVLTLtl6l0Q9PzuZnZsHo3m",
    });
  
    Alice.save();
  
    const Alan = new UserModel({
      name: "alan",
      email: "alan.alan@gmail.com",
      password: "$2b$10$U9vzshXE7s4GFqz4JPmSzuvIiblImQXVLTLtl6l0Q9PzuZnZsHo3m",
    });
  
    Alan.save();
  }
  

  connect()
  .then(console.log)
  .catch(console.error);