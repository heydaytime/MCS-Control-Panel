import { scryptSync, randomBytes } from "crypto";
import Users from "../models/users.js";
import emailer from "./email.js";

const userDB = {
  signup: async ({ firstName, lastName, email, password }) => {
    try {
      const salt = randomBytes(16).toString("hex");
      const hashedPassword = scryptSync(password, salt, 64).toString("hex");
      const verificationCode = randomBytes(4).toString("hex");

      const user = await Users.create({
        firstName,
        lastName,
        email,
        hashedPassword,
        salt,
        isVerified: false,
        verificationCode,
      });

      emailer.verification(email, verificationCode);
      setTimeout(async () => {
        await Users.findOneAndDelete({ email });
      }, 10 * 60 * 1000);
    } catch (err) {
      return false;
    }

    return true;
  },

  verify: async ({ email, verificationCode }) => {
    const user = await Users.findOne({ email });

    if (user != undefined && verificationCode == user.verificationCode) {
      try {
        user.verificationCode = undefined;
        user.isVerified = true;

        user.save();
      } catch (err) {
        return false;
      }

      return true;
    } else return false;
  },

  login: async ({ email, password }) => {
    const user = await Users.findOne({ email });
    if (user == undefined || user.isVerified == false) return false;

    const { hashedPassword, salt } = user;
    const currentHashedPassword = scryptSync(password, salt, 64).toString(
      "hex"
    );
    return currentHashedPassword == hashedPassword;
  },
};

export default userDB;
