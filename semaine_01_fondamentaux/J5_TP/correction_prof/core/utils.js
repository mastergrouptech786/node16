const dayjs = require('dayjs');

require('dayjs/locale/fr');

dayjs.locale('fr');

function showUsers(students){
    let users = "<ul>";
    for (const { id, name , birth } of students) {
      users += `<li style="margin: 5px; ">Name : ${name} date : ${dayjs(birth).format('dddd D MMMM YYYY')}
        <a class="btn btn-danger" href="/delete?id=${id}">Delete</a>
      </li>`;
    }
    users += "</ul>";

    return users;
}


exports.showUsers = showUsers;