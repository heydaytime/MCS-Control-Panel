import express from "express";

import {
  loginController,
  signupController,
  verifyController,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/login").post(loginController);
router.route("/signup").post(signupController);
router.route("/verify").post(verifyController);

export default router;
