let count = 0;
const [searchNumber, max] = [Math.floor(Math.random() * 100) + 1, 10];

console.log(
  "Vous devez deviner le nombre caché, pour se faire choisissez un nombre compris entre 1 et 100"
);

console.log(searchNumber);

process.stdin.on("data", (chunk) => {

  const number = parseInt(chunk);

  // gestion des erreurs
  if (isNaN(number) === true) {
    console.log(`Ce que vous avez tapez n'est pas un nombre`);
  } else {
    count++;
    if (count >= max) {
      console.log(`Vous n'avez plus la possibilité de faire un choix ${count}`);

      console.log(`Voulez-vous rejouer ?  répondre par y/n`);
      process.exit(0);
    }

    if (number > searchNumber) {
      console.log(`Le nombre est plus petit que ${number}`);
    } else if (number < searchNumber) {
      console.log(`Le nombre est plus grand que ${number}`);
    } else {
      console.log(`Bravo vous gagnez en ${count} coup(s)`);
      process.exit(0);
    }
  }
});
