# Configuration 

Jusqu'à présent, nous avons utilisé la convention de module par défaut de Node.js, et qui existe depuis sa création : **CommonJS**

Node.js a introduit à partir de la `v8.5.0` le support expérimental des modules ECMAScript : les **ES Modules** (abrégé **ESM**). Il fallait alors utiliser le flag `--experimental-modules` avec la commande `node` : `node app.js --experimental-modules`.

Depuis la `v13.2.0`, le support est considéré comme stable et ne nécessite aucun flag.

*Cependant* pour des raisons techniques internes liées à la façon dont sont chargés les modules en mémoire, il y a 2 possibilités distinctes pour pouvoir utiliser les modules ESM dans Node.js :

1. Soit utiliser l'extension `.mjs` (au lieu de `.js`)
2. Soit définir l'option `{ "type" : "module" }` dans le fichier `package.json` à la racine du projet.

On préfèrera pour ce cours la seconde option.

Nous pouvons donc utiliser les marqueurs `import` et `export` tels que définis par le standard ECMAScript dans les modules Node :

```json
// package.json
{
    "type" : "module"
}
```

```javascript
// countModule.js

let count = 0;

export function incrementCount(c) {
    count += c;
}

export function getCount() {
    return count;
}
```

```javascript
// index.js

import { incrementCount, getCount } from './countModule.js';
// L'extension ".js" en revanche redevient obligatoire !

getCount(); // 0
incrementCount(40);
incrementCount(2);
getCount(); // 42
```

---

Aujourd'hui, il est donc possible de choisir 2 stratégies de chargement de modules au sein d'une app Node.js (*CommonJS* ou *ES Modules*).

*ESM* ne rend pas pour autant *CommonJS* obsolète. Même si la syntaxe des *ESM* est plus moderne et plus agréable à utiliser, [elle ne fait pas l'unanimité](https://gist.github.com/joepie91/bca2fda868c1e8b2c2caf76af7dfcad3). De plus, les packages publiés sur la base de registre NPM ne sont pas toujours compatibles *ESM*.

Libre à vous de choisir donc le style de modules utilisés dans votre app Node.js.

Dans ce cours, nous choisirons d'utiliser les modules *ESM*.
## Installation

- Installez le projet suivant : kittens dans votre dossier Exercices de ce chapitre. Nous vous rappelons les commandes ci-dessous :

```bash
npm init -y
```

Nous allons également installer `nodemon `et définir un script de démarrage :

```bash
npm install nodemon --save-dev
```

```json
 "scripts": {
    "start": "nodemon server.js"
  },
```

Pensez à changer le nom du point d'entrée dans le fichier package.json de votre application :

```json
"main": "server.js",
```

## 01 Exercice import & export

Attention, on ne vous demande pas de créer ici un serveur Node.js comme vu en cours. Nous allons tester uniquement la syntaxe ESM d'import/export de fichiers pour voir si tout est bien configuré.

Créez un dossier utils et un fichier `hello.js`. Définissez une fonction `hello()` : elle prendra un unique paramètre `message` qu'elle renverra. 

Voyez les deux exemples d'export et d'import ci-dessous 

- export

```js
export const hello = (message) => {
  return message;
}
```

- import dans le fichier `server.js`

```js
import { hello } from './utils/hello.js'; 
```

**⚠ Attention ! Contrairement à CommonJS jusqu'ici, il est obligatoire de préciser l'extension `.js` sur cette syntaxe !**

Lancez l'application et affichez en console le message de la fonction hello.


Rappels sur les imports/exports

Vous pouvez exporter plusieurs éléments et les importer dans d'autres fichiers, dans ce cas la syntaxe de l'export et l'import est celle que nous venons de voir. Vous pouvez également faire un export par défaut. Uniquement un par fichier dans ce cas :

```js
export default Model;
```

Et l'import dans un autre fichier :

```js
import MyModel from './utils/model.js';
```
