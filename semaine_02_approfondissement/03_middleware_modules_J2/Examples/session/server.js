import express from "express";
import session from 'express-session';

const app = express();
const port = 8000;

// Middleware qui ajoute les sessions à Express
app.use(session({
  name: 'simple',
  secret: 'simple',
  resave: true,
  saveUninitialized: true
}));

const countSession = (req, res, next) => {
  if (req.session.count) 
    req.session.count++;
  else
    req.session.count = 1;

  if(req.session.count > 10){
    req.session.count = 1;
  }
  
  next();
}

const other = (req, res, next) => {

  console.log(req.session)

  next();

}

// page d'accueil +1 sur le counter 
app.get('/', [countSession, other], (req, res) => {
  res.json({ count: req.session.count });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
