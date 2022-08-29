import express from "express";
import path from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";

import kittens from "./routers/kittens.js";

const app = express();
const port = 8000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "pug");

app.use('/', kittens);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
