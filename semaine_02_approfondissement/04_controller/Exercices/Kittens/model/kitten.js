import path from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Optimisation, on aura de meilleurs idées avec une BD
const kittens = JSON.parse(
    readFileSync(__dirname + "/../Data/kittens.json", "utf-8")
  );

export function all(){

    return kittens;
}

export function find(id){
    const kitten = kittens.find((kitten) => kitten.id == id);

    return kitten;
}