import { find } from "../model/user.js";

export default async function (req, res) {
  const { _id } = req.session;
  
  const user = await find(_id);

  res.render("admin", user );
}
