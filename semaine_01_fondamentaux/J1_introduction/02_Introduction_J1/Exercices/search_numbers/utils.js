export function generate(min = 1, max = 100) {
  return Math.floor(Math.random() * max) + min;
}

export function formatMessage(message){
    return message.toString().trim().replace("\n", ""); 
}