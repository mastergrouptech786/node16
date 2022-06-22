import { createInterface } from "readline";
import "dotenv/config";
import { Chifoumi, statistic } from "./utils.js";

const {
  APP_SHEET: sheet,
  APP_ROCK: rock,
  APP_CHISEL: chisel,
  APP_MAX: max,
  APP_COUNT: count,
  APP_STATUS_MATCH_NUL: match_null,
  APP_PATH_SAVE_STAT_JSON: path_save,
} = process.env;

const chifoumi = new Chifoumi({ sheet, rock, chisel, max, count, match_null });
const [yes, no] = chifoumi.status;

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt("CHIFOUMI> ");
console.log(chifoumi.labels.init);
rl.prompt();

rl.on("line", (line) => {
  const choice = line.trim().toLowerCase();

  if (chifoumi.check(choice) === false) {
    console.log(chifoumi.message);
    rl.prompt();

    return;
  }

  if (choice === yes) {
    statistic(chifoumi.stat, path_save);
    chifoumi.init(count);
    console.log(chifoumi.labels.init);
    rl.prompt();

    return;
  }

  if (choice === no) {
    rl.close();
    return;
  }

  if (chifoumi.count > 0) {
    chifoumi.run(choice, chifoumi.choice());
    console.log(chifoumi.message);
  } else {
    console.log(chifoumi.stat);
    console.log("Voulez-vous rejouer ? (y/n)");
  }

  rl.prompt();
}).on("close", () => {
  console.log(chifoumi.labels.stop_game);
  process.exit(0);
});
