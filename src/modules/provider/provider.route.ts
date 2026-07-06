import { Router } from "express";
import { providerController } from "./provider.controller.js";

const router = Router();

router.post("/gear", providerController.createGear)
router.put("/gear/:id", providerController.updateGearById)
router.delete("/gear/:id", providerController.removeGearById)

export const providerRoute = router;