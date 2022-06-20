process.stdin.on('data', (chunk) => {
    // récupère le flux et le converti en chaine de caractères, la méthode replace permet de supprimer le saut de ligne            
    const text = chunk.toString().replace("\n", ""); 

    console.log(text);
    console.log(chunk);


    process.exit(0);

});