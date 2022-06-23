export function sanitize(str) {
  str = str
    .replaceAll("+", " ")
    .split("&")
    .map((s) => s.split("="));
  const format = {};
  for (const [name, value] of str) format[name] = value;

  return format;
}

export function show(students) {

    let lis = '';
    for(const {name, age} of students) lis += `<li>Name: ${name} age:${age}</li>` ;

  return `<ul>${lis}</ul>`;
}

export function template(students) {
  return (`
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Ajoutez un utilisateur</title>
    <link href="/bootstrap" rel="stylesheet" type="text/css" />
</head>
<body>
    <div class="container">
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/users">Users</a></li>
            </ul>
        </nav>
        <div class="row">
            <div class="col-sm-8">
                <form action="/user" method="POST">
                    <div class="form-group">
                        <label>Name
                            <input class="form-control" name="name" type="text" />
                        </label>
                    </div>
                    <div class="form-group">
                        <label>Age
                            <input class="form-control" name="age" type="text" />
                        </label>
                    </div>
                    <button type="submit" class="btn btn-primary">Ajouter</button>
                </form>
            </div>

            <div class="col-sm-4">
                ${show(students)}
            </div>
        </div>
    </div>
</body>
</html>
`) ;
}
