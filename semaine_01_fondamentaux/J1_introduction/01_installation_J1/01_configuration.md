# Installation

**Utilisez la version LTS de Node.js**

Téléchargez la dernière version de **Node.js** LTS, choisissez votre système d'exploitation et télécharger l'exécutable. 

Normalement les variables d'environnement de votre système seront automatiquement mises à jour. Vous pourrez alors exécuter Node.js en ligne de commande.

(download)[https://nodejs.org/en/download/]

## Vérification

Dans votre console, tapez les lignes de commande suivantes, respectivement **Node** et son gestionnaire de dépendances **npm**, ce dernier permet d'installer des modules JS.

En console :

```bash
node --version
npm --version
```

### Exercice d'application

Créez un fichier demo.js écrivez le code qui suit dans ce fichier :

```js
console.table({
    name: "Node.js",
    gestionnaire_paquet : "npm"
});

console.log('Hello Node.js')

```

Puis tapez la ligne de commande suivante en console, à la racine du dossier dans lequel ce trouve votre fichier.

```bash
node demo.js
```

## Git & Github

Créez un compte Github pour travailler.