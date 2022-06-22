export function show(students) {
  let html = "<ul>";

  for (const student of students) html += `<li>${student}</li>`;
  html += "</ul>";

  return html;
}

export function shuffle(students) {
  const newStudents = [...students];
  // astuce que tout le monde utilise
  newStudents.sort((_) => Math.random() - 0.5);

  return newStudents;
}
