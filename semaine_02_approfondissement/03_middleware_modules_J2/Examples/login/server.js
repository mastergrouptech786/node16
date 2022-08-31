import express from "express";

const app = express();
const port = 8000;

const isConnect = true;

const myLogger = function (req, res, next) {
    console.log('LOGGED');

    if(isConnect === false){
        res.redirect('/login');

        return;
    }

    next(); // passe à l'action suivante ou au middleware suivant
  };

// gestion des routes
app.get("/", myLogger, (req, res) => {
  res.send("Hello World");
});

app.get("/login", (req, res) => {
  res.send("Vous devez vous logger avant");
});





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
