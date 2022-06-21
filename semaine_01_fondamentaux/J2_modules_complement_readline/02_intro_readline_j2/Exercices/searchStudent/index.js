import { createInterface } from "readline";
const students = ["Alan", "Sonia", "Sophie"];
const studentsSearch = students.map((s) => s.toLowerCase());

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt("OHAI> ");
rl.prompt();

rl.on("line", (line) => {
  const student = line.trim().toLowerCase();

  if (studentsSearch.includes(student)) {
    rl.close();
    return;
  }

  console.log(`No !`);

  rl.prompt();
});

rl.on("close", () => {
  console.log(`Ok !`);
  process.exit(0);
});
