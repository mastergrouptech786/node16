const readline = require("readline");

// Création de l'interface de gestion des entrées et sorties, basée sur input et ouput de la console

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});

// Message dans la console
rl.setPrompt('OHAI> ');
// définit l'invite de commande
rl.prompt();

// écoute tout les événements de la console et récupère le flux en entrée
rl.on('line', (line) =>{
  switch(line.trim()) {
    case 'hello':
      console.log('world!');
      break;
    default:
      console.log('Say what? I might have heard `' + line.trim() + '`');
      break;
  }
  rl.prompt();
  // si on fait un Ctrl + c pour arrêter le process
}).on('close', () => {
  console.log('Have a great day!');
  process.exit(0);
});
