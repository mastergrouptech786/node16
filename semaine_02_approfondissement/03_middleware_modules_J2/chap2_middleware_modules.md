# Introduction aux Middlewares dans Express

Un middleware est une fonction qui accepte 3 arguments : `req`, `res` et à une fonction `next`.

Un middleware va se résumer aux actions suivantes :

1. Exécuter tout type de code.

2. Apporter éventuellement des modifications aux objets de demande et de réponse `req` et `res`.

3. Court-circuiter éventuellement le cycle de demande-réponse.

4. Appeler le middleware suivant dans la pile avec la fonction `next()`.

Attention, si le cycle request, response ne se termine pas vous devez pensez à invoquer la fonction middleware `next()` pour passer à l'action suivante ou au middleware suivant. Sinon vous risquez de bloquer l'application.

## Deux manières pour définir/utiliser un middleware 

Vous avez deux manières d'appeler un middleware :

```js
// définition du middleware
const myLogger = function (req, res, next) {
  console.log('LOGGED');
  next(); // passe à l'action suivante ou au middleware suivant
};

// 1. appel du middleware
app.use(myLogger);

// 2. appel middleware sur une route spécifique en deuxième paramètre
app.get('/', myLogger, (req, res) => {

});
```

## Express est basé sur la notion de middleware

On peut voir une application Express basée sur la notion de middleware comme une suite de fonctionnalités qui s'éxecutent dans un certain ordre, l'un à la suite des autres. Une requête peut déclencher cette succession de middleware avant de retourner une réponse.

Middlewares : M1, M2 et M3

```text
M1    =>      M2    =>     M3  =>  ... => res.send("response")
     next()      next()         next()    Réponse au client
```

## 01 Exercice parité

Vous allez partir de notre squelette d'application **simple_00**, puis vous allez créez deux routes, une classique pour la page d'accueil, et une deuxième route paramétrique.

Notez que vous devez passer votre middleware en deuxième paramètre, dans ce contexte, pour que le middlewaire s'exécute sur la route paramètrique.

```js
app.get('/check/:number', myMiddleware, (req, res) => {

    res.json({ message })
})
```

Créez un middleware qui modifiera la valeur du message de retour en fonction de la parité du nombre passé en paramètre :

- Le nombre est pair

- Le nombre est impair

Traitez les réponses au format JSON.

## body-parser directement intégré dans Express

Cette fonctionnalité est maintenant intérgé à Express depuis la version 4.16.0

Il permet de lire le flux en entrée et de le récupérer sous forme JSON dans la propriété req.body de la requête.

C'est assez technique, ce middleware peut par exemple décompresser le flux entrant pour l'exposé à la propriété body de la requête. Nous allons l'utiliser pour travailler sur les données entrantes.

```js
import express from 'express';
// pour que les données soient transmises dans la partie req.body en JSON et parser avant traitement.
app.use(express.urlencoded({extended: true})); 
app.use(express.json());
```

## session (persistance)

Attention, l'utilisation des sessions en production comme présenté ci-dessous n'est pas une bonne idée. En effet vous êtes limité en terme de mémoire sur un serveur Node.js. Il faudra l'utiliser les sessions avec une base de données, nous le voyons plus loin dans le cours.

Installez la dépendance **express-session**, nous utiliserons la configuration suivante pour travailler avec nos variables de session.

```js
import session from 'express-session';

// Middleware
app.use(session({
  name: 'simple',
  secret: 'simple',
  resave: true,
  saveUninitialized: true
}));
```

Par exemple vous pouvez maintenant créer un compteur assez facilement à partir d'une route donnée :

```js
app.get('/', (req, res)=> {
  if( req.session.count  ){
    req.session.count++;
  }else{
    req.session.count = 1;
  }

  res.json({ message : "Hello World", count : req.session.count });
});
```

Vous pouvez également re-générez la session ou même la détruire à l'aide des méthodes suivantes :

```js
req.session.regenerate((err) =>{
  // will have a new session here
});

req.session.destroy((err) =>{
  // cannot access session here
});
```

## 02 Exercice counter redirection

Vous allez créez une petite application en partant du modèle **simple_00** et en utilisant les sessions. 

Toutes les réponses se feront en JSON.

1. Créez un compteur à chaque fois que l'on visite la page / (racine de l'app). Ajoutez +1 au compteur.

2. Une fois que le compteur arrive à 10 on redirigera l'utilsateur sur une page affichant le résultat (JSON).

Gestion de la redirection en Express :

```js
res.redirect('/check')
```

3. Une route **delete** permettra de remettre à jour le compteur, elle redirigera l'utilisateur sur la page d'accueil une fois le compteur.

## 03 TP projet de connexion (Challenge)

Vous allez partir du modèle model_complet_01 pour réaliser ce projet. Nous allons faire une page de connexion et une page "sécurisée" accessible uniquement après une connexion réussie. Il  n'y aura qu'un seul utilisateur.

Pour se connecter l'utilisateur devra renseigner son login/password.

Remarque : vous n'avez pas, pour l'instant, la possibilité de passer des données à la vue, nous verrons comment faire cela dans un prochain cours.  

1. Contrainte graphique : vous utiliserez un bootstrap ou un autre framework CSS, il suffit de récupérer les sources et de les placez dans le dossier public. Pensez à faire le nécessaire pour ces fichiers statiques.

2. Construisez un formulaire de connexion : login/password il s'affichera sur la page principale. Pour la gestion des mots de passe vous pouvez utiliser cryptoJS pour hasher le mot de passe.

3. Créez une page que nous allons "sécuriser" à l'aide d'un middleware/
