import ModelPost, { show, add } from './utils.js';

import os from 'os'; // module natif de Node


console.log(show("BONJOUR"));
console.log(add(1, 2));

console.log(new ModelPost('posts'));

console.log(os)

// on récupère les informations de l'utilisateur
const { username } = os.userInfo();

// on récupère le nombre de CPU
const cpus = os.cpus().length;

console.log(
  `Cet ordinateur appartient à ${username} il a ${cpus} CPU.`
);

console.log(process);