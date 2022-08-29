# Express

Express un framework basé sur Node.js, il est minimaliste et flexible. Il nous permettra de développer des applications Web et mobiles. Il simplifie grandement la mise en place d'un serveur Node.js. En effet, nous avons vu comment définir un serveur Node.js de manière native. Dans un contexte plus professionnel nous utilisons Express. Bien sûr, les bases que vous avez vues avant sur Node.js sont indispensables pour bien comprendre le fonctionnement d'une application Node.js avec Express.

Express possède des méthodes et middlewares qui vous permettront de développer rapidement une application. La notion de middleware est fondamentale dans Express. 

Express est performant et ne masque pas les fonctionnalités natives de Node.js.

**Documentation** : [docs](https://expressjs.com/)

## Installation 

Dans le projet kittens que nous avons déjà vu dans le chapitre précédent, tapez la ligne de commande suivante :

```bash
npm install express --save
```

### Serveur Express

L'écriture d'un serveur Web avec Express est largement plus simple, testez la dans le projet kittens. 

Notez que maintenant nous utiliserons la syntaxe ES6 pour les imports/exports.

```js
// import ES6
import express from "express";
import { hello } from "./utils/hello";

const app = express();
const port = 8000;

// gestion des routes
app.get("/", (req, res) => {
// envoi au client de la réponse
  res.send(hello("Hello World"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

```
Dans le cadre d'une API qui retournerait un format tel que JSON vous écrirez :

```js
res.json({ message : "Hello Wordl"})
```

## Route get et post

Voici un petit résumé que vous pouvez trouver dans la documentation officielle pour vous aider :

```js

// GET method route
app.get('/',  (req, res) => {
  res.send('GET request to the homepage');
});

// POST method route
app.post('/',  (req, res) => {
  res.send('POST request to the homepage');
});
```

Vous pouvez également réagir aux requêtes dont les verbes sont : GET, POST, PUT, DELETE pour une route donnée, dans ce cas vous avez un middleware spécifique :
```js
app.all('/secret',  (req, res, next) =>{
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});
```

La syntaxe d'une route peut également être traiter à l'aide d'une regex dans directement écrite dans le nom de la route :

```js
app.get('/ab*cd', (req, res) =>{
  res.send('ab*cd');
});
```

Vous pouvez également gérer les **paramètres dynamiques** dans une route comme suit :

```js
app.get('/user/:id', (req, res) => {
  res.send(req.params.id);
});
```

## Fichiers statiques

Nous avons vu que la gestion de fichiers statiques avec Node.js n'était pas évidente, mais avec Express c'est facile.

En Express, Vous devez simplement définir le dossier dans lequel les fichiers statiques se trouvent (fichier `server.js`) :

```js
app.use(express.static('public'));
```

Dans vos vues maintenant les liens suivants seront considérés comme des liens vers des fichiers statiques :

```text
http://localhost:8000/images/kitten.jpg
http://localhost:8000/css/style.css
http://localhost:8000/js/app.js
http://localhost:8000/images/bg.png
http://localhost:8000/hello.html
```

À noter que vous pouvez également définir le chemin en absolu, ce qui est parfois mieux pour éviter toute erreur de chargement liée à l'exécution de Node à partir d'un mauvais emplacement.

Si vous utilisez **CommonJS**, vous avez accès à la variable globale `__dirname` :

```js
// CommonJS
const path = require('path');

app.use(express.static(path.join(__dirname, '/public')); 
```

Si vous utilisez en revanche les **ES Modules**, il faut passer par une autre méthode pour obtenir le chemin absolu :

`url.fileURLToPath`, `path.dirname` et `import.meta.url`

```js
// ES Modules
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, 'public')));
```

## 02 Exercice shop kittens

Vous allez utiliser les données suivantes que vous placerez pour l'instant dans un fichier JSON : kittens.json

```json
[
    {"id" : 1, "name": "Bob", "images" : "bob.jpg", "age" : 16, "description" : "super cat" },
    {"id" : 2, "name": "Wild" , "image" : "wild.jpg" , "age" : 10,"description" : "super cat" },
    {"id" : 3, "name": "Nyan" , "image" : "nyan.jpg" , "age" : 12, "description" : "super cat" },
]
```

1. Créez une page principale affichez dans un ul/li l'ensemble des noms des chats ainsi que leurs photos respectives. Récupérez des images de chat, se sont des fichiers statiques.

2. Chaque nom de chat est cliquable, sur cette page vous afficherez en plus de leurs noms leurs ages et description.

## Header

Vous avez également accès au header avec Express. Vous pouvez y accéder et les changer également. Rappelons que c'est le rôle d'une application Web côté serveur de définir précisément la réponse au client : son statut et code.

- Accéder aux headers

```js
app.get('/', (req, res) => {
  req.header('User-Agent');

  // vous permet d'accéder également aux headers
  req.headers;

  // response ...
})
```

- Préciser les headers dans la réponse, en fonction du contenu renvoyé.

```js
res.set('Content-Type', 'text/plain');
res.set('Content-Type','application/json');
res.set('Content-Type','text/html');
res.set('Content-Type','image/png'); // le type de l'image peut-être changer.
```

Vous avez également la possibilité de définir les codes statuts de la réponse :

```js
res.status(200).send("Message");
res.status(404).send("Page Not found");
res.status(500).json({ error : "Error server"});
```

## Post et traitement des données

Pour récupérer les données POST en Express simplement vous devez définir les middlewares suivants dans votre fichier server.js 

```js
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
```

Une fois que vous avez mis en place les deux ou une des méthodes ci-dessus vous pouvez les récupérer avec req.body sous forme d'un JSON :

```js
app.post('/add/post',  (req, res) => {
  console.log(req.body);
  res.json(req.body);
})
```