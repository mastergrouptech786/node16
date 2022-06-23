# Client et serveur Node

Vous pouvez définir un client en Node.js, bien sûr il faudra un serveur à l'autre bout pour traiter ces requêtes.

Créez deux fichiers distincts et lancez le client et le serveur.

- Définition d'un client en Node à l'aide de la méthode get

```js
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

// envoi d'une requête vers le serveur définit plus bas.
http.get(`http://${hostname}:${port}`, res => {

  let data = '';

  // recevoir les données par morceaux : Buffer
  res.on('data', chunk => {
    data += chunk;
  });

  res.on('end', () => console.log(data));
});
```

- Définition du serveur (classique)

```js
const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  const date = new Date();

  const message = { message: `Hello World ! ${date.toTimeString()}` };
  console.log( JSON.stringify(message) );

  res.end(JSON.stringify({ message }));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```
