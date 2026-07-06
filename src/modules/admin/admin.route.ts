import { Router } from "express";
import { adminController } from "./admin.controller.js";

const router = Router();

router.get("/users", adminController.getAllUser);
router.get("/gear", adminController.getAllGear);
router.get("/rentals", adminController.getAllRentalOrders);
router.patch("/users/:id", adminController.updateUser);

export const adminRoute = router;