# Controller

La notion de contrôleur est importante, elle nous permettra de séparer la logique. Le contrôleur à le rôle de chef d'orchestre. C'est de sa responsabilité d'organiser la réponse.

## 04 Exercice Mise en place des contrôleurs dans le projet kittens

Récupérez le projet et copiez le dans un dossier **kitten_04**.

Nous allons créez deux fichiers dans un dossier controller. Clairement deux contrôleurs.

- Controller: Fichier home.js pour le contrôleur de la page d'accueil

```js
export default (req, res) => {

}
```

- Controller: Fichier kitten.js pour le contrôleur ayant la responsabilité d'afficher les contenus 

```js
export default (req, res) => {

}
```

Vous importerez maintenant ces deux contrôleurs dans les routes pour terminer la factorisation. 