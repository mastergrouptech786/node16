import { find, verif } from "../model/user.js";

export default async function (req, res) {
  const { auth } = req.session;

  if(auth){

    req.session.auth = false;
    req.session.message = "Vous êtes déco";
    req.session.name = "";
    req.session._id = "";

    res.redirect('/');

    return;
  }

  res.redirect('/');

}
