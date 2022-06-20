

export function show(message){
    return message.split('').reverse().join('');
}

export function add(n1, n2){
    return n1 + n2 ;
}

// Export par défaut un par fichier 
export default function Model(name){
    this.name = name;
}