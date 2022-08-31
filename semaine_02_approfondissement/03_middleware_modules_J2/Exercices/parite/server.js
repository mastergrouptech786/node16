import express from "express";

const app = express();
const port = 8000;
let message = "";

const parite = function (req, res, next) {
  const { number } = req.params;

  if (number % 2 === 0)
    message = "pair"
  else
    message = "impair";

  next();
};

app.get("/", (req, res) => {
  res.send("TEST");
});

// gestion des routes
app.get("/test/:number", parite, (req, res) => {
  res.send(`Resultat : ${message}`);
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
