# Server node

Nous allons découvrir le module http, nous allons, ici, créer notre propre serveur natif en Node.js.

```js
// module
const http = require("http");
```

Pour créez un serveur qui écoutera des requêtes, nous allons faire une instance de la méthode **createServer** sur le module http.

```js
const server = http.createServer();
```

La gestion des requêtes se fait de manière asynchrone, elle se fera à l'aide dune **fonction callback**.

Notez que http est également capable d'effectuer des requêtes, nous le verrons plus tard.

```js
// pour faire des requêtes clients
http.get(…);
```

## Création du callback

Nous allons récupérer les input/output de notre serveur, c'est un stream, un flux entrant, nous allons également gérer la réponse et sa sortie.

- Stream req représente la requête.

- Stream res représente la réponse.

- La méthode writeHead envoie les entêtes au client (navigateur). Précisez le code HTTP de retour, ici 200, c'est le statut HTTP. N'oubliez pas l'encodage également.

- La méthode write écrit la réponse en sortie, end termine la requête. Il ne faut pas l'oubliez c'est primordiale pour stopper le processus. 

```js
const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/plain",
  });
  res.write("Bonjour le serveur");
  res.end();
});
```

Il faut également définir appeler la méthode listen, pour écouter les requêtes entrantes sur un port donné, une fois que le serveur est lancé.

```js
server.listen(8000);
```

## Exemple complet

Testez le serveur suivant, créez un fichier **server.js** dans le dossier Examples. Visitez la page http://localhost:8000, pour voir si tout marche bien.

```js
// server.js
const http = require("http");
const hostname = 'localhost';
const port = '8080';

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/plain",
  });
  res.end("Hello, World!"); // méthode write et end 
};);
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

Puis tapez la ligne de commande suivante :

```bash
node server.js
```

Nous allons utiliser **nodemon**. Si ce n'est pas déjà fait tapez la ligne de commande suivante, à chaque fois que l'on modifiera le code maintenant, vous ne serez pas obligé de relancer le serveur pour voir vos modifications.

```bash
npm install -g nodemon 
```

```bash
nodemon server.js
```

## Gestion des routes 

Vous pouvez également créer des routes spécifiques pour servir des pages en fonction d'une URI. Pensez au favicon.ico il faut gérer cette requête faites par le navigateur sur votre serveur.

```js

// server 
const server = http.createServer((req, res) => {

    const url = req.url.replace('/', '');

    if (url === 'favicon.ico') {
        res.writeHead(200, { 'Content-Type': 'image/x-icon' });

        res.end();
        return; // pensez à arrêter l'exécution des scripts côté serveur une fois la réponse envoyée.
    }

    res.writeHead(200, {
    "Content-Type": "text/plain",
        });
    res.end("Hello, World!"); // méthode write et end 
    }
);

```

Pour gérer les autres routes vous utiliserez la propriété **url** de la méthode req. Vous analyserez sa valeur pour définir une réponse donnée. Notez que vous pouvez retourner une page HTML également avec la méthode res.end :

```js
// analyse de la route
const url = req.url.replace('/', '');

res.end(`
  <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Ma page de test</title>
    </head>
    <body>
      <img src="images/firefox-icon.png" alt="Mon image de test">
    </body>
  </html>
`);

```

## 01 Exercice Shuffle

Configurez un nouveau projet dans le dossier Exercices. Et utilisez les données suivantes :

```js
const users = [
    'Alan',
    'Sophie',
    'Bernard',
    'Elie'
];
```

Créez un module utils dans un dossier src, dans ce fichier créez un algorithme qui mélange les users. Puis définissez un serveur Node.js natif, comme on a vu dans ce cours, et utilisez deux routes : la route racine qui affichera une page HTML avec la liste des users (voir les données ci-dessous) et la route shuffle qui mélangera les utilisateurs.

Remarque : dans le fichier package.json et dans la partie scripts, vous pouvez définir une commande start exécutable pour lancer le serveur :

```json
{
  "name": "shuffle",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "nodemon server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Pour lancer ce script vous devez utiliser l'option de commande run de npm :

```bash
npm run start
```

## Servir un fichier statique

Nous allons utiliser le module **fs** de Node.js pour servir un fichier statique à notre client. Considérez l'exemple suivant :

```js
// définitions de plusieurs constantes à la fois
const fs = require('fs'),
    http = require('http');

http.createServer(function (req, res) {
  // __dirname donne le chemin absolu pour trouver le fichier
  // ici la politique des urls indiquera le chemin à suivre pour récupérer le fichier
  fs.readFile(__dirname + req.url,  (err,data) => {

    // on gère les erreurs et surtout on retourne une page 404 si il y a un problème
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      // Il ne faut oublier de sortir de la fonction pour ne pas exécuter la suite du script
      return;
    }
    // si tout se passe bien on retourne les données en indiquant que tout c'est bien passé
    res.writeHead(200);
    res.end(data);
  });
}).listen(8080);
```

## 02 Exercice search JSON file

Créez un projet et récupérez le fichier Data/ dans la partie Exercices du cours. 

Nous allons créer une petite API qui retournera des données au format JSON.

Implémentez les routes suivantes : 

- all

- /search/[Name_user] pour récupérer les informations liés à un utilisateur

Gérez également les erreurs, si un user n'existe pas alors on retournera une page 404.