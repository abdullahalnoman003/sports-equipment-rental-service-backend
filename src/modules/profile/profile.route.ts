import { Router } from "express";
import { profileController } from "./profile.controller";

const router = Router();

router.put("/update-profile", profileController.updateProfile);

export const profileRoute = router;