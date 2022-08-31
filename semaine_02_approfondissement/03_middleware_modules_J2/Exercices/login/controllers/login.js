import { find, verif } from "../model/user.js";

export default async function (req, res) {
  const { email, password } = req.body;

  req.session.message = "";
  req.session.auth = false ;
  req.session.name = "" ;

  if (email.trim() === "" || password.trim() === "") {
    req.session.message = "Il manque un champ à remplir";

    res.redirect("/");

    return;
  }

  // TODO verif email

  const { isAuth, name } = await verif(email, password) ;

  if ( isAuth === true) {

    req.session.auth = true ;
    req.session.name = name ;

    res.redirect("/admin");

  }else{
    req.session.message = "erreur : Email ou password";
    res.redirect("/");

    return;
  }


}
