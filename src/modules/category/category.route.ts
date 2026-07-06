import { Router } from "express";
import { categoryController } from "./category.controller.js";

const router = Router();

router.get("/", categoryController.getAllCategory)

export const categoryRoute = router;