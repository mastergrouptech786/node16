import { createServer } from "http";
import { readFileSync } from "fs";
import students from "./Data/students.js";
import { sanitize } from "./utils.js";
import "dotenv/config";
import { renderFile } from 'pug';

import routes from './routes.js'

const {
  APP_HOST: hostname,
  APP_PORT: port,
  APP_VIEWS: path_views,
  APP_DATA: path_data,
} = process.env;

// on définit une variable globale elle persiste tant que le serveur n'est pas arrêté
let message = "";

const server = createServer(routes);

// lance le serveur à une adresse et un port donné
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
