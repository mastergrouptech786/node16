import { createServer } from "http";
import { readFileSync } from "fs";
import students from "./Data/students.js";
import { sanitize, template } from "./utils.js";
import "dotenv/config";
import { renderFile } from 'pug';

const {
  APP_HOST: hostname,
  APP_PORT: port,
  APP_VIEWS: path_views,
  APP_DATA: path_data,
} = process.env;

let message = "";

const server = createServer((req, res) => {
  const url = req.url.replace("/", "");

  message ? console.log(message) : null;

  if (url === "bootstrap") {
    res.writeHead(200, { "Content-Type": "text/css" });
    const css = readFileSync("./assets/css/bootstrap.min.css"); // on envoit le fichier au client
    res.write(css);
    res.end();

    return;
  }

  if (url === "favicon.ico") {
    res.writeHead(200, { "Content-Type": "image/x-icon" });
    res.end();

    return;
  }

  if (url === "" && req.method === "GET") {
    const pageHome = renderFile(`${path_views}/home.pug`, { students });
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(pageHome);

    return;
  }

  if (req.method === "POST" && url === "user") {
    let body = "";
    req.on("data", (data) => {
      body += data;
    });
    req.on("end", () => {
      const { name, age } = sanitize(body);

      if (name === "" || age === "" || isNaN(age)) {
        message = `Attention l'un de vos champs n'est pas valide`;
      } else {
        students.push({ name, age });
      }

      res.writeHead(302, {
        location: `http://${hostname}:${port}`,
      });
      res.end();
    });

    return;
  }

  if (url === "users" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });

    console.log(template(students))
    res.end(template(students));

    return;
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
