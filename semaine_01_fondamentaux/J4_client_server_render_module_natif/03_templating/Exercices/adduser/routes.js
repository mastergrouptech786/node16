import controllerAddUser from "./controllerAddUser.js";
import 'dotenv/config';
import { renderFile } from 'pug';
import { readFileSync} from 'fs';

import students from "./Data/students.js";

let message = '';

const {
    APP_VIEWS: path_views,
  } = process.env;

export default (req, res) => {
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
    const pageHome = renderFile(`${path_views}/home.pug`, {
      students,
      titlePage: "Home page",
      message: message,
    });
    message = "";
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(pageHome);

    return;
  }

  if (req.method === "POST" && url === "user") {
    controllerAddUser(req, res);

    return;
  }

  if (url === "users" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });

    res.end(
      renderFile(`${path_views}/users.pug`, {
        students,
        titlePage: "Users page",
      })
    );

    return;
  }
};
