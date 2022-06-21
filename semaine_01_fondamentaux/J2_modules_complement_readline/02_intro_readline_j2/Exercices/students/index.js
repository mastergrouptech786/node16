import { readFileSync } from "fs";
import { createInterface } from "readline";
import { avg, search, messages } from "./utils.js";
import "dotenv/config";

const { FILE_NAME, PRECISION } = process.env;
const { students } = JSON.parse(readFileSync(FILE_NAME));

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt("OHAI> ");
rl.prompt();

rl.on("line", (line) => {
  const name = line.trim();

  if (isNaN(name) === false) {
    console.log(messages.error_type(name));

    return;
  }

  const student = search(name, students) ;

  if (student === null) {
    console.log(messages.error_name(name));

    return;
  }

  const { notes, name:n } = student;

  console.log(messages.response({name : n, avg : avg({notes, name : n, precision : PRECISION})}));

  rl.prompt();
}).on("close", () => {
  process.exit(0);
});
