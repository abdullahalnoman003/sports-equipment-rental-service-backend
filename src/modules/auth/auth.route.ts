import { Router } from "express";
import { authController } from "./auth.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import { Role } from "../../../generated/prisma/client.js";

const router = Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/me",authMiddleware(), authController.getLoggedInUser);

export const authRoute = router;