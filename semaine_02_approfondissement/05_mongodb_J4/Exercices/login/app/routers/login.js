import express from "express";
import loginController from "../controllers/login.js";
import homeController from "../controllers/home.js";
import adminController from "../controllers/admin.js";
import logoutController from "../controllers/logout.js";
import authMiddleware from "../middlewares/checkauth.js";

const router = express.Router();

router.get("/", homeController);
router.post("/login", loginController);
router.get("/admin", authMiddleware, adminController);
router.get("/logout", logoutController);

export default router;