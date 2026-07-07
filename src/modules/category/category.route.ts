import { Router } from "express";
import { categoryController } from "./category.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import { Role } from "../../../generated/prisma/client.js";

const router = Router();

router.get("/", categoryController.getAllCategory)
router.post("/create-category", authMiddleware(Role.ADMIN), categoryController.createCategory)

export const categoryRoute = router;