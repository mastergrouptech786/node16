import { createServer } from "http";
import students from "./Data/students.js";
import { show, shuffle } from "./utils.js";

const hostname = "localhost";
const port = "8080";

const server = createServer((req, res) => {
  const url = req.url.replace("/", "");

  if (url === "favicon.ico") {
    res.writeHead(200, { "Content-Type": "image/x-icon" });

    res.end();

    return;
  }

  if (url === "") {

    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    res.end(`
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Liste students</title>
</head>
<body>
    <h1>Students</h1>
    ${show(students)}
    <p><a href="/shuffle">Shuffle</a></p>
</body>
</html>
`);
    return;
  }

  if (url === "shuffle") {

    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    res.end(`
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <title>Liste students</title>
  </head>
  <body>
      <h1>Students</h1>
      ${show(shuffle( students ))}
    <p><a href="/shuffle">Shuffle</a></p>
    <p><a href="/">Home</a></p>
  </body>
  </html>
  `);
  
    return;
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
