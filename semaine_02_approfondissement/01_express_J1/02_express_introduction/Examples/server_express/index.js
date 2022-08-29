// import ES6
import express from "express";

import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// une isntance d'express
const app = express();
const port = 8000;

const connect = true;

// app.use(express.static("public"));
// chemin absolu plus rapide

app.use(express.static(path.join(__dirname, '/public'))); 

app.use((req, res, next) => {
  // envoi au client de la réponse
  if (connect === true) {
    console.log("User connect", req.path);
  }

  next();
});

// gestion des routes
app.get("/", (req, res) => {
  // envoi au client de la réponse
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="http://localhost:8000/css/style.css" rel="stylesheet" />
    <title>Document</title>
</head>
<body>
    <h1>Hello</h1>
</body>
</html>
  `);
});

app.get("/ab*cd", (req, res) => {
  res.send("ab*cd");
});

app.get("/message", (req, res) => {
  // envoi au client de la réponse
  res.json({ message: "Hello Wordl" });
});

app.get("/user/:id", (req, res) => {
  res.json({ name: `Alan ${req.params.id}` });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
