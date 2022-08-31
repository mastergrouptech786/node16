import path from "path";
import express from "express";
import homeController from '../controller/home.js';
import kittenController from '../controller/kitten.js';

const router = express.Router();

router.get("/", homeController);
router.get("/kitten/:id", kittenController);

export default router;