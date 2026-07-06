import { Router } from "express";
import { rentalController } from "./rental.controller.js";

const router = Router();

router.post("/create-rental", rentalController.createRental)
router.get("/get-rentals", rentalController.getRentals)
router.get("/get-rentals/:id", rentalController.getRentalsById)

export const rentalRoute = router;