import express from "express";
import router from "./router.js";
import { connect } from "./model/product.js";
import * as dotenv from "dotenv";
dotenv.config();
const { DB_PASSWORD, DB_NAME, DB_LOGIN, DB_PORT } = process.env;

const app = express();
const port = 3002;

app.use("/", router);

connect({ DB_PASSWORD, DB_NAME, DB_LOGIN, DB_PORT })
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch(console.error);
