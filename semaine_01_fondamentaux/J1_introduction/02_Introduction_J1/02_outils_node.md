# Outils Node.js & npm

Commandes d'installation (npm CLI).

[liste des commandes CLI](https://docs.npmjs.com/cli/v6/commands)

Voici les principales commandes que l'on va utiliser. Notez bien qu'une commande peut avoir des options.

Tous les packages supplémentaires ou tiers de Node.js s'installent dans un dossier spécifique : **node_modules**.

## Installer des packages

Pour connaître l'ensemble des commandes disponibles tapez la ligne de commande suivante :

```bash
npm 
```

Pour installer un package, attention il faut d'abord initialiser votre projet avec un npm init :

```bash
npm install [non_du_module]
```
## Configuration d'un nouveau projet

Vous devez renseigner, en mode interactif, le nom du projet et donnez quelques détails sur votre projet.

```bash
npm init 
```

Une autre manière d'utiliser npm init est d'autorité mettre -y pour répondre oui à toutes les questions. Le nom du module sera dans ce cas le nom du dossier dans lequel vous avez lancé cette commande.

```bash
npm init -y 
```

Le fichier package.json permet de définir l'ensemble des dépendances d'un projet. Il permet de configurer également un projet que l'on souhaite partager avec d'autre développeur.

## Permet de chercher un package

Permet de rechercher sur le site npmjs https://www.npmjs.com/

```bash
npm search [non_du_module]
```

## Liste des modules

La commande suivante listera l'ensemble de vos modules installés dans votre projet.

```bash
npm list 
```

## Exécuter un programme

La commande suivante permet de lancer un exécutable

```bash
npm run [command] 
```

Notez qu'il existe une commande spécifique npx, elle permet d'exécuter un programme ou de tester un module sans l'installer forcément dans le projet. 

## modules tiers 

Il existe de nombreux modules tiers que l'on ajoute généralement à ses projets. Les modules natifs de Node.js ne suffisent pas.

### Module : nodemon

Installez de manière globale **nodemon**. C'est un module qui permet de lancer l'exécution de Node.js en console en mode watch/reload. A chaque fois que vous modifiez le code dans votre fichier JS nodemon re-exécute node pour afficher le résultat. Plus besoin de relancer une exécution pour voir les changements dans vos fichiers.

```bash
# L'option de commande -g installe le module de manière globale
npm install -g nodemon 
```

### Module : dayjs

Ce module fonctionne dans le navigateur, mais également dans la plateforme Node.js. Il permet de gérer des dates.

Une installation locale, dans l'un de vos projets Node.js, se fera comme suit :

```bash
npm install dayjs --save
```

## Module : express

Ce module est un module permettant de développer des Web App Node.js, c'est un framework léger et efficient.

```bash
npm install --save express 
```
