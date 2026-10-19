import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware";
import { Role } from "../../../generated/prisma";
import { reviewController } from "./review.controller";

const router = Router();

// Public: average rating per gear item, powers the listing page rating filter.
router.get("/summary", reviewController.getRatingSummary);
// Public: powers the reviews section on the gear detail page.
router.get("/", reviewController.getReviewsByGear);
router.post("/", authMiddleware(Role.CUSTOMER), reviewController.review)

export const reviewRoute = router;