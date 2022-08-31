import users from "../Data/users.js";
import bcrypt from "bcrypt";

export function find(email, password) {
  const user = users.find(
    (user) => (user.email === email) & (user.password === password)
  );

  if (user) {
    const { name, email, id } = user;

    return { name, email, id };
  }

  return null;
}

export async function verif(email, password) {
  const user = users.find((user) => user.email === email);

  if (user === undefined) return  ({ isAuth: false, name: null });

  // await => attend que l'asynchronisme de cet action se termine
  const match = await bcrypt.compare(password, user.password);

  console.log(match);
  console.log(user.password);

  if (match) {
    return ({ isAuth: true, name: user.name });
  }

  return ({ isAuth: false, name: null });
}
