# Routage

Nous allons maintenant aborder la notion de gestionnaire de routes. Nous pouvons pour mieux organiser l'application créer un dossier spécifique pour rassembler les routes.

## 03 Exercice factorisation des routes

Récupérez le projet précédent et créez dans le dossier Exercices un dossier **03_kittens**.

À partir des remarques suivantes, vous devez refactorer le code.

Créez un fichier `kittens.js`, c'est le router, dans le dossier `routes`. Puis définissez les routes de l'application :

```js
import express from "express";
const router = express.Router();

router.get('/', (req, res) =>{
  res.send('kittens home page');
});

router.get('/kitten/:id', (req, res) =>{
  res.send('About birds');
});

export default router;

```

Importez vos routes dans le fichier **server.js** comme suit :

```js
import kittens from "./routes/kittens";

app.use('/', kittens);
```

Notez que vous pouvez pré-fixer les routes en changent le premier paramètre, dans l'exemple suivant les routes seront pré-fixer par le slug kittens

```js
import kittens from "./routes/kittens";

app.use('/kittens', kittens);

```