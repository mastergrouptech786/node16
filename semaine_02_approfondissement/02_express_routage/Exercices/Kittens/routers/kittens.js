import path from "path";
import express from "express";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const kittens = JSON.parse(
  readFileSync(__dirname + "/../Data/kittens.json", "utf-8")
);

router.get("/", (req, res) => {
  res.render("home", {
    kittens,
  });
});

router.get("/kitten/:id", (req, res) => {
    const kitten = kittens.find((kitten) => kitten.id == req.params.id);
    if (kitten) {
      res.render("kitten", {
        kitten,
      });
  
      return;
    }
  
    res.send("404");
});

export default router;