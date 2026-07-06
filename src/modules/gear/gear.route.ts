import { Router } from "express";
import { gearController } from "./gear.controller.js";

const router = Router();

router.get("/:id", gearController.getGearById)
router.get("/", gearController.getAllGear)


export const gearRoute = router;
