import { createServer } from "http";
import { readFileSync } from "fs";
import students from "./Data/students.js";
import { sanitize } from "./utils.js";
import "dotenv/config";
import { renderFile } from 'pug';

const {
  APP_HOST: hostname,
  APP_PORT: port,
  APP_VIEWS: path_views,
  APP_DATA: path_data,
} = process.env;

// on définit une variable globale elle persiste tant que le serveur n'est pas arrêté
let message = "";

const server = createServer((req, res) => {
  // on retire le premier slash plus facile à comparer par la suite
  const url = req.url.replace("/", "");

  // gestion des urls href et favicon
  if (url === "bootstrap") {
    res.writeHead(200, { "Content-Type": "text/css" });
    const css = readFileSync("./assets/css/bootstrap.min.css"); // on envoit le fichier au client
    res.write(css);
    res.end();

    return;
  }

  if (url === "favicon.ico") {
    // requête en deux parties : header + body 
    // attention le boby c'est la partie html/css, json ... 
    res.writeHead(200, { "Content-Type": "image/x-icon" });
    res.end();

    // penser à sortir de la fonction de callback une fois la réponse envoyer au client. Vous ne pouvez renvoyer qu'une seule réponse à chaque fois
    return;
  }

  // la méthode req.method => indique le verbe de la requête HTTP
  if (url === "" && req.method === "GET") {
    const pageHome = renderFile(`${path_views}/home.pug`, { students, titlePage : "Home page", message : message });
    message = '';
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(pageHome);

    return;
  }

  if (req.method === "POST" && url === "user") {
    let body = "";
    // les données du formulaire arrivent de manière par paquet la première fonction de callback récupérer ses données
    // une fois les données envoyées par le client la méthode end plus bas est exécutée
    req.on("data", (data) => {
      body += data;
    });

    // méthode qui s'exécute une fois les données envoyées
    req.on("end", () => {
      const { name, age } = sanitize(body);

      // erreur firts
      if (name === "" || age === "" || isNaN(age)) {
        message = `Attention l'un de vos champs n'est pas valide !`;
        // renderFile compile la vue et passe les données dynamiquement à celle-ci sous forme un littéral clé/valeur
        const pageFormError = renderFile(`${path_views}/home.pug`, { students, titlePage : "Form html", message });
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(pageFormError);

        return;
      } else {
        message = `Merci l'utilisateur ${name} a bien été ajouté`;
        students.push({ name, age });
      }

      // statut HTTP de la redirection 302 
      res.writeHead(302, {
        location: `http://${hostname}:${port}`,
      });
      // toujours terminer la requête
      res.end();
    });

    return;
  }

  if (url === "users" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });

    res.end(renderFile(`${path_views}/users.pug`, { students, titlePage :"Users page" }));

    return;
  }
});

// lance le serveur à une adresse et un port donné
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
