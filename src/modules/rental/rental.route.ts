import { Router } from "express";
import { rentalController } from "./rental.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import { Role } from "../../../generated/prisma/client.js";

const router = Router();

router.post("/create-rental", authMiddleware(Role.CUSTOMER), rentalController.createRental)
router.get("/get-rentals", authMiddleware(Role.PROVIDER), rentalController.getRentals)
router.get("/get-rentals/:id", authMiddleware(Role.PROVIDER), rentalController.getRentalsById)

export const rentalRoute = router;