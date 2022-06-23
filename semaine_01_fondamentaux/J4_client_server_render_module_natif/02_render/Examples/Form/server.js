const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

let dataSend = "";

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");

  if (req.method === "GET" && req.url === "/") {
    res.end(`
  <!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Ajoutez un utilisateur</title>
  
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col-8">
                <form action="/user" method="POST">
                    <div class="form-group">
                        <label>Name
                            <input class="form-control" name="name" type="text" />
                        </label>
                    </div>
                    <div class="form-group">
                    <label>Age
                        <input class="form-control" name="age" type="text" />
                    </label>
                </div>
                <div class="form-group">
                <label>Note
                    <input class="form-control" name="note" type="text" />
                </label>
            </div>
                    <button type="submit" class="btn btn-primary">Ajouter</button>
                </form>
            </div>
        </div>
        <div class="col-4">
        <h2>Sidebar</h2>
         ${dataSend ?? null}
        </div>
    </div>
    </div>
</body>
  `);

    return;
  }

  if (req.method === "POST" && req.url === "/user") {
    let body = "";
    req.on("data", (data) => {
      body += data;
    });

    // On écoute maintenant la fin de l'envoi des données avec la méthode on et l'attribut end
    req.on("end", () => {
      //   res.writeHead(200, { "Content-Type": "application/json" });
      //   res.end(JSON.stringify({ result: body }));

      res.writeHead(302, {
        location: `http://${hostname}:${port}`,
      });
      dataSend +=  body;
      res.end();
    });

    return;
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
