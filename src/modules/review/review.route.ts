import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware";
import { Role } from "../../../generated/prisma";
import { reviewController } from "./review.controller";

const router = Router();

router.post("/", authMiddleware(Role.CUSTOMER), reviewController.review)

export const reviewRoute = router;