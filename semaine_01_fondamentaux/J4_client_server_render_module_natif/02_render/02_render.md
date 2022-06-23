# Render file

Nous allons essayer de gérer maintenant le rendu d'une page HTML avec un fichier css et des images en utilisant, uniquement pour l'instant, un serveur Node natif.

Vous allez dans cet exercice apprendre à mieux gérer un serveur Node.js natif, avec des fichiers statiques et des données de type Post.

Vous n'avez pas la possibilité de passer des données aux vues de manière dymanique pour l'instant.

## 01 Exercice add users TP

1. Définissez l'arborescence suivante pour gérer les différents assets et vues de l'exercice.

Placez le bootstrap.min.css dans le fichier styles.css, nous allons gérer deux pages : la page d'accueil qui contiendra un formulaire et une page qui ne sera pas physiquement un fichier, mais qui sera gérée dans le code du serveur lui-même.

```text
view/
    home.html <-- formulaire
assets/
    css/
        bootstrap.min.css  <-- voir la gestion des css dans les questions ci-dessous
server.js
```

2. Installez le projet comme d'habitude.

3. Les données, placez les dans le fichier server.js

```js
const students = [
    { name : "Sonia"},
    { name : "Antoine"}
];
```

4. Mettre la page principale en place avec les liens 

Voici le code de la page principale à mettre dans le fichier home.html. Vous devez également lire son contenu et le renvoyer au client.

4. Vous allez maintenant créez le formulaire permettant d'insérer un nouvel utilisateur. Utilisez l'exemple de code ci-dessous, ne cherchez pas pour l'instant à gérer les CSS, nous le ferons plus bas (question 5).

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Ajoutez un utilisateur</title>
    <link href="/bootstrap" rel="stylesheet" type="text/css" />
</head>

<body>
    <div class="container">
        <div class="row">
            <div class="col-8">
                <form action="/" method="POST">
                    <div class="form-group">
                        <label>Name
                            <input class="form-control" name="name" type="text" />
                        </label>
                    </div>
                    <button type="submit" class="btn btn-primary">Ajouter</button>
                </form>
            </div>
        </div>
        <div class="col-4">
            <p class="text-primary">
                <a type="submit" class="btn" href="/users">users</a>
            </p>
        </div>
    </div>
    </div>
</body>

</html>
```

Dans votre serveur maintenant, il faut récupérer les données POST, on détermine d'abord le type de requête qui est envoyé au serveur. Puis on stream les données qui arrivent et on les met dans une variable à l'aide de la méthode req.on, voyez l'exemple suivant, il est détaillé.

```js
if (req.method === 'POST') {
    // Handle post info...
    let body = '';
    req.on('data', data => {
        body += data;
    });

    // On écoute maintenant la fin de l'envoi des données avec la méthode on et l'attribut end
    req.on('end', () => {
        res.writeHead(200, { 'Content-Type' : 'application/json' });
        res.end( JSON.stringify({ "result" : body }));
    });
}
```

5. Gestion des css 

Vous devez mettre un lien dans la page principale vers les CSS. Cependant, c'est le serveur qui va envoyer le contenu de ce fichier au client (navigateur dans notre cas). Voyez le code ci-dessous :

```js
 if (url === "bootstrap") {
    res.writeHead(200, { "Content-Type": "text/css" });
    const css = fs.readFileSync("./assets/css/bootstrap.min.css"); // on envoit le fichier au client
    res.write(css);
    res.end();

    return;
  }

```

6. Vous allez maintenant créer le formulaire permettant d'insérer un nouvel utilisateur. Utilisez l'exemple de code ci-dessous :

Récupérez les données POST, on déterminera le type de requête qui est envoyé au serveur, puis on stream les données qui arrivent, aidez-vous de l'exemple de code suivant :

```js
if (req.method === 'POST') {
    // Handle post info...
    let body = '';
    req.on('data', data => {
        body += data;
    });

    // On écoute maintenant la fin de l'envoi des données avec la méthode on et l'attribut end
    req.on('end', () => {
        res.writeHead(200, { 'Content-Type' : 'application/json' });
        res.end( JSON.stringify({ "result" : body }));
    });
}
```
