import express from "express";
import session from "express-session";
import bcrypt from "bcrypt";
import router from './routers/login.js';

const app = express();
const port = 8000;

app.use(express.static('public'));
app.set("view engine", "pug");
// récupérer les données post sous forme d'un JSON
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.use(session({
  name: 'login',
  secret: 'alklkdin987hdjd',
  resave: true,
  saveUninitialized: true
}));

// const salt = 10;
// const hash = bcrypt.hashSync("1234567890", salt);
// console.log(hash)

const checkAuth = function (req, res, next) {
  next();
};

// app.use(function(req, res, next){
//   console.log(req.session);

//   next();
// })

app.use('/', router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
