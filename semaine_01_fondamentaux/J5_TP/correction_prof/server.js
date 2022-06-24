const http = require("http");
const fs = require("fs");
const { showUsers } = require("./core/utils");

require("dotenv").config();

const { APP_ENV, APP_LOCALHOST: hostname, APP_PORT: port } = process.env;

const success = {
  status: null,
  message: null,
};

const server = http.createServer((req, res) => {
  const url = req.url.replace("/", "");

  if (url === "style") {
    res.writeHead(200, { "Content-Type": "text/css" });
    const css = fs.readFileSync("./assets/css/style.css");
    res.write(css);
    res.end();

    return;
  }

  if (req.method === "POST") {
    let body = "";
    req.on("data", (data) => {
      body += data;
    });

    // On écoute maintenant la fin de l'envoi des données avec la méthode on et l'attribut end
    req.on("end", () => {
      const replacer = new RegExp(/\+/, "g");

      const data = body.split(/\&/).map((d) => {
        d = d.replace(replacer, " ");
        return d.split(/=/);
      });

      const student = {};

      student.name = data[0][1];
      student.birth = data[1][1];

      student.id = Date.now().toString();

      if (student.name != "" && student.birth != "") {
        const data = fs.readFileSync("./data/students.json");
        const students = JSON.parse(data)["students"];
        students.push(student);
        const dataStudents = { students: students };
        fs.writeFileSync("./data/students.json", JSON.stringify(dataStudents));
        success.status = 1;
        success.message = "Merci";
      } else {
        success.status = 0;
        success.message = "Attention un des champs n'est pas rempli";
        
        res.writeHead(301, { Location: `http://${hostname}:${port}/users` });
        res.end();

        return;
      }
      // redirection le code 301 indique une redirection permamente
      res.writeHead(301, { Location: `http://${hostname}:${port}/users` });
      res.end();
    });

    return;
  }

  if (url === "") {
    const home = fs.readFileSync("./views/home.html");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(home);
  }

  if (url === "users") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const students = fs.readFileSync("./data/students.json");

    const users = showUsers(JSON.parse(students)["students"]);

    res.end(`
<html>
<head>
<meta charset="utf-8">
<title>Ajoutez un utilisateur</title>
<link rel="stylesheet" href="/style" type="text/css">
</head>
<body>
<div class="container">
<nav class="text-primary">
    <a class="btn" href="/">Ajouter un user</a>
    <a class="btn selected" >users</a>
</nav>
</div>
<div class="container">
${success.status != null ? success.message : ""}
  ${users}
</div>
</body>
`);
  }

  if (url.includes("delete")) {
    console.log(url.split(/=/));

    const id = url.split(/=/)[1];
    console.log(id);
    const students = JSON.parse(fs.readFileSync("./data/students.json"))[
      "students"
    ];

    if (id) {
      console.log(id);
      const dataStudents = { students: students.filter((s) => s.id != id) };
      fs.writeFileSync("./data/students.json", JSON.stringify(dataStudents));
      success.status = 1;
      success.message = "Suppression réuissi";
    }
    res.writeHead(301, { Location: `http://${hostname}:${port}/users` });
    res.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
