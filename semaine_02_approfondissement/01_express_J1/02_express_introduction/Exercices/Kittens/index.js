import pug from "pug";
import { readFileSync } from "fs";
import path from "path";
import express from "express";

import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 8000;

const kittens = JSON.parse(
  readFileSync(__dirname + "/Data/kittens.json", "utf-8")
);

app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("home", {
    kittens,
  });
});

app.get("/kitten/:id", (req, res) => {
  const kitten = kittens.find((kitten) => kitten.id == req.params.id);

  if (kitten) {
    res.render("kitten", {
      kitten,
    });

    return;
  }

  res.send("404");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
