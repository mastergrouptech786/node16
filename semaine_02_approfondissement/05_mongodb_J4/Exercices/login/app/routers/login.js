import express from "express";
import loginController from '../controllers/login.js';
import homeController from '../controllers/home.js';
import adminController from '../controllers/admin.js';

const router = express.Router();

router.get("/", homeController);
router.post("/login", loginController);
router.get("/admin", adminController);

export default router;