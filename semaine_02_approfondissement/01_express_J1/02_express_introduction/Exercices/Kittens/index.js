import express from "express";
import kittens from "./routes/kittens";

const app = express();
const port = 8000;

app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "pug");

app.use('/', kittens);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
