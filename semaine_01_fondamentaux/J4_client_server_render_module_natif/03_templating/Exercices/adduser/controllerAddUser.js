export default function(req, res){
    let body = "";
    // les données du formulaire arrivent de manière par paquet la première fonction de callback récupérer ses données
    // une fois les données envoyées par le client la méthode end plus bas est exécutée
    req.on("data", (data) => {
      body += data;
    });

    // méthode qui s'exécute une fois les données envoyées
    req.on("end", () => {
      const { name, age } = sanitize(body);

      // erreur firts
      if (name === "" || age === "" || isNaN(age)) {
        message = `Attention l'un de vos champs n'est pas valide !`;
        // renderFile compile la vue et passe les données dynamiquement à celle-ci sous forme un littéral clé/valeur
        const pageFormError = renderFile(`${path_views}/home.pug`, { students, titlePage : "Form html", message });
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(pageFormError);

        return;
      } else {
        message = `Merci l'utilisateur ${name} a bien été ajouté`;
        students.push({ name, age });
      }

      // statut HTTP de la redirection 302 
      res.writeHead(302, {
        location: `http://${hostname}:${port}`,
      });
      // toujours terminer la requête
      res.end();
    });
}