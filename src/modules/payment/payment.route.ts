import { Router } from "express";
import { paymentController } from "./payment.controller";
import authMiddleware from "../../middleware/auth.middleware";
import { Role } from "../../../generated/prisma";

const router = Router();

// router.post("/confirm", paymentController.confirmPayment);
router.post("/create", authMiddleware(Role.CUSTOMER), paymentController.createPaymentIntent);
router.get("/", authMiddleware(Role.CUSTOMER), paymentController.getAllPayments);
router.get("/:id", authMiddleware(Role.CUSTOMER), paymentController.getPaymentById);

export const paymentRoute = router;