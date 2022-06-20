# Introduction

## Node.js

C'est une plateforme de service écrite en JavaScript orientée vers les applications réseaux événementielles. 

- Elle a été inventé par Ryan Dahl le 27 mai 2009. 

- Elle est basée sur la V8, moteur JavaScript et open-source, développé par le projet Chromium et la librairie libuv développé en C++ qui prend en charge les E/S asynchrones basées sur des boucles d'événements.

Node.js est basé sur l'**Event Loop**, comme JS d'ailleurs, qui est un design pattern orienté **gestion d'événement aysnchrone**. Rappelons que JavaScript est **mono-thread**, c'est-à-dire un seul fil d'exécution, il est cependant capable de gérer des événements asynchrones. 

Voir le schéma ci-après ( représentation simplifiée ).

L'asynchronisme en JS permet de gérer des exécutions de codes différées, en mettant son code dans une autre task techniquement dans une **task queue**, sans bloquer le fil d'exécution principale. Ce code sera remis dans la task principale lorsque les fonctions de callback seront à exécuter.

<img src="../images/async.png" width="400" />

## Stack principale

La stack ou pile d'exécution, c'est le premier élément à prendre en compte lors de l'exécution du code JS, tout le code JS y est exécuté.

**Fonctionnement** : la stack conserve le contexte de fonction, cela permet par exemple d'avoir les stack threads pour effectuer du débogage. Elle mémorise le contexte. Et surtout exécute le code qui s'y trouve de manière synchrone. Cependant, et nous le verrons, la task queue peut remettre du code, fonctions de callback, à tout moment dans ce fil d'exécution. Ce mécanisme permet de ne pas bloquer le fil d'exécution principal et donc d'avoir un code asynchrone.

```js
const showResult = (a, b) => {
  console.log( square(sum(a, b)));
};

const sum = (a, b) => a+ b;
const square = (a, p = 2) => a**p;

showResult(3,7);
```

Dans le pile d'exécution :

```text
showResult(3,7);
sum(3,7); <- garde le contexte de l'appel
square(10, 2); <- garde le contexte de l'appel
console.log(100); <- garde le contexte de l'appel
```

A la fin de l'exécution la stack se videra.

### Pour un code asynchrone.

Tapez les lignes suivantes et exécutez les dans votre terminal.

```js
console.log('Start');

// API (boite noire) des navigateurs par exemple
setTimeout(() => console.log('Hello world !'), 1000);

console.log('End');
```

## Task Queue

La **Task Queue**, c'est l'endroit où les callbacks attendent d'être exécutés. Cette pile va être dépilée par un autre élément : **l'event loop**. Il lit périodiquement et sous certaines conditions ce qui s'y trouve. 

La Stack Queue se videra au fur et à mesure de l'exécution des callbacks, fonctions en attentent dans cette pile. Le code y est exécuté en mode **FIFO** (first in first out).

Voici un schéma pour terminé, plus précis, de l'Event Loop dans le contexte de Node.js ou Navigateur avec la V8 :

<img src="../images/event_loop.png" width="400" />



