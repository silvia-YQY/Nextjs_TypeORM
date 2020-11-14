import { NextApiHandler } from "next";
import { SignIn } from "../../../src/model/SignIn";
const Sessions: NextApiHandler = async (req, res) => {
  const { username, password, passwordConfirmation } = req.body;
  res.setHeader("Content-Type", "application/json; charset=utf-8 ");
  const signIn = new SignIn();
  signIn.username = username;
  signIn.password = password;
  await signIn.validate();
  if (signIn.hasErrors()) {
    res.statusCode = 422;
    res.end(JSON.stringify(signIn.errors));
  } else {
    res.statusCode = 200;
    res.end(JSON.stringify(signIn.user));
  }
};

export default Sessions;
