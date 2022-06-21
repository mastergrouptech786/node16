export function avg({ notes, precision = 100 }) {
  // error firts
  if (notes.length === 0) {
    throw new Error("Tableau de note vide");

    return;
  }

  const sum = notes.reduce((acc, curr) => acc + curr);

  console.log(precision);

  return Math.floor( (sum / notes.length) * precision ) / precision;
}

export function search(name, students) {
  name = name.toLowerCase();

  if (students.length === 0) {
    throw new Error("Tableau de note vide");

    return;
  }

  return students.find((s) => s.name.toLowerCase() === name) ?? null ;
}

export const messages = {
    error_type : (m) => `Ce n'est pas une chaîne de caractères : ${m}`,
    error_name : (m) => `Cet étudiant est inconnu : ${m}`,
    response : ({name, avg}) => `L'étudiant ${name} a comme moyenne : ${avg}`
 }