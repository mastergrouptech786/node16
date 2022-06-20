import { generate, formatMessage } from "./utils.js";

let count = 0;
let [searchNumber, max] = [generate(1, 100), 5];

const messages = {
  msg_init : "Vous devez deviner le nombre caché, pour se faire choisissez un nombre compris entre 1 et 100",
  msg_replay : "Voulez-vous rejouer ?  répondre par y/n",
  msg_error : (num) => `Ce que vous avez tapez, ${num} n'est pas un nombre`
  // TODO: refactoriser les messages ici
}

console.log(messages.msg_init);

process.stdin.on("data", (chunk) => {
  const message = formatMessage(chunk);

  if (message === "y") {
    [searchNumber, count] = [generate(1, 100), 0];
    console.log(messages.msg_init);


    return;
  }

  if (message === "n") {
    process.exit(0);

    return;
  }

  const number = parseInt(chunk);

  if (isNaN(number) === true) {
    console.log(messages.msg_error(number));

    return;
  }

  count++;
  if (count >= max) {
    console.log(`Vous n'avez plus la possibilité de faire un choix ${count}`);
    console.log(messages.msg_replay);

    return;
  }

  if (number > searchNumber) {
    console.log(`Le nombre est plus petit que ${number}`);
  } else if (number < searchNumber) {
    console.log(`Le nombre est plus grand que ${number}`);
  } else {
    console.log(`Bravo vous gagnez en ${count} coup(s)`);
    console.log(messages.msg_replay);

    return;
  }

});
