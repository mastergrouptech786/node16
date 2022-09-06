import express from "express";
import { all, find, remove } from "./model/product.js"

const router = express.Router();

/*
AVEC CURL un client dans la console vous lancez une requête de type GET comme suit, avec un paramètre dynamique

curl http://localhost:3002
*/
router.get("/", async (req, res) =>{
    const products = await all();

    res.json({ products });
});

/*
AVEC CURL un client dans la console vous lancez une requête de type GET comme suit, avec un paramètre dynamique

curl http://localhost:3002/delete/Alex
*/
router.get("/show/:name", async (req, res) =>{
    const { name } = req.params;
    const product = await find(name);

    res.json({ product });
});

/*
AVEC CURL un client dans la console vous lancez une requête de type DELETE comme suit 

curl --request "DELETE" http://localhost:3002/delete/Alex
*/
router.delete("/delete/:name", async (req, res) =>{
    const { name } = req.params;
    const product = await remove(name);

    res.json({ name });
});

export default router;
