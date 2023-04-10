import user from "../functions/user_db.js";
import * as EmailValidator from "email-validator";

const loginController = async (req, res) => {
  const { email } = req.body.data;
  if (!isValidEmail(email, res)) return false;

  const check = await user.login(req.body.data);

  if (check) res.status(201).send("👍🏻");
  else res.status(400).send("👎🏻");
};

const signupController = async (req, res) => {
  const { email } = req.body.data;
  if (!isValidEmail(email, res)) return false;

  const check = await user.signup(req.body.data);

  if (check) res.status(201).send("👍🏻");
  else res.status(400).send("👎🏻");
};

const verifyController = async (req, res) => {
  const { email } = req.body.data;
  if (!isValidEmail(email, res)) return false;

  if (!EmailValidator.validate(req.body.data.email))
    res.status(400).send("Bad Email");

  const check = await user.verify(req.body.data);
  if (check) res.status(201).send("👍🏻");
  else res.status(400).send("👎🏻");
};

const isValidEmail = (email, res) => {
  const isValid = EmailValidator.validate(email);
  if (!isValid) {
    res.status(400).send("bad Email");
    return false;
  }
  return true;
};

export { loginController, signupController, verifyController };
