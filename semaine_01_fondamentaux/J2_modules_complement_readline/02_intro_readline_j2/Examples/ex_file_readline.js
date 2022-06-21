const fs = require('fs'),
    readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('./students.txt', { encoding : 'utf-8'}),
    output: fs.createWriteStream('./comment.txt'),
    terminal: false
});


rl.on('line',(chunk) =>{
    
    console.log(chunk)

    if(chunk === 'Céline') {
        rl.close();

        return;
    }

});

rl.on('close', () => {
    console.log("write Julie");
    rl.output.write("Julie")
})
