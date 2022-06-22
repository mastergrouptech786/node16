import { appendFileSync, readFileSync, writeFileSync } from "fs";

export class Chifoumi {
  constructor({ sheet, rock, chisel, max, count, match_null }) {
    this.sheet = sheet;
    this.rock = rock;
    this.chisel = chisel;
    this.max = parseInt(max);
    this.match_null = match_null;
    this.count = count;
    this.elems = [sheet, rock, chisel];
    this.stat = {
      player: 0,
      computer: 0,
      count: 0,
    };
    this.labels = {
      stop_game : 'Merci et à bientôt',
      error_choice: `Ce n'est pas un bon label`,
      init: `C'est à vous de jouer`,
      player: (choicePlayer, choiceComputer) =>
        `C'est vous qui gagné :${choicePlayer} contre ${choiceComputer} count :  ${this.count}`,
      computer: (choicePlayer, choiceComputer) =>
        `Vous perdez :${choicePlayer} contre ${choiceComputer} count :  ${this.count}`,
    };
    this.message = "";
    this.status = ['y', 'n'];
  }

  choice() {
    return this.elems[Math.floor(Math.random() * this.max)];
  }

  run(choicePlayer, choiceComputer) {
    this.message = "";
    this.stat.count++;
    if (choicePlayer === choiceComputer) {
      this.message = `Match nul ${choicePlayer} ${choiceComputer}`;

      return this.match_null;
    }

    this.count--;

    if (choicePlayer === this.rock) {
      if (choiceComputer === this.chisel)
        this.player(choicePlayer, choiceComputer);
      else this.computer(choicePlayer, choiceComputer);
    }

    if (choicePlayer === this.sheet) {
      if (choiceComputer === this.rock)
        this.player(choicePlayer, choiceComputer);
      else this.computer(choicePlayer, choiceComputer);
    }

    if (choicePlayer === this.chisel) {
      if (choiceComputer === this.sheet)
        this.player(choicePlayer, choiceComputer);
      else this.computer(choicePlayer, choiceComputer);
    }
  }

  player(choicePlayer, choiceComputer) {
    this.stat.player++;
    this.message = this.labels.player(choicePlayer, choiceComputer);
  }

  computer(choicePlayer, choiceComputer) {
    this.stat.computer++;
    this.message = this.labels.computer(choicePlayer, choiceComputer);
  }

  check(choice) {

    if (this.status.includes(choice)) return true;

    if (this.elems.includes(choice) === false) {
      this.message = this.labels.error_choice;
      return false;
    }
  }

  init(count) {
    this.count = count;
    this.stat = {
      player: 0,
      computer: 0,
      count: 0,
    };

    this.message = "";
  }
}

export function statistic(stat, path_save) {
  let statJson = readFileSync(path_save, { encoding: "utf-8" }) || `[]`;
  statJson = JSON.parse(statJson);
  statJson.push(stat);
  writeFileSync(path_save, JSON.stringify(statJson));
}
