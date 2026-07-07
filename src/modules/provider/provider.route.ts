import { Router } from "express";
import { providerController } from "./provider.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/gear", providerController.createGear)
router.get("/gear/getallgear", providerController.getAllGear)
router.put("/gear/:id", providerController.updateGearById)
router.delete("/gear/:id", providerController.removeGearById)
router.get("/orders/", providerController.getAllOrders)
router.patch("/orders/:id", providerController.updateOrderById)

export const providerRoute = router;