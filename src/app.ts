import { gearRoute } from './modules/gear/gear.route.js';
import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import config from "./config/index.js";
import cors from "cors";
import { authRoute } from "./modules/auth/auth.route.js";
import globalErrorHandler from './global/globalErrorhandler.js';
import { providerRoute } from './modules/provider/provider.route.js';
import { categoryRoute } from './modules/category/category.route.js';
import { adminRoute } from './modules/admin/admin.route.js';
import authMiddleware from './middleware/auth.middleware.js';
import { Role } from '../generated/prisma/client.js';
import { rentalRoute } from './modules/rental/rental.route.js';
import { reviewRoute } from './modules/review/review.route.js';
import { paymentRoute } from './modules/payment/payment.route.js';
import { paymentController } from './modules/payment/payment.controller.js';
import { profileRoute } from './modules/profile/profile.route.js';

const app : Application = express();

app.post("/api/payment/confirm", express.raw({ type: "application/json" }), paymentController.confirmPayment);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: config.app_url,
    credentials: true,
}));
app.get("/", (req : Request, res: Response) => {
    res.send("Hello From GearUp!");
})

// User routes
app.use("/api/auth", authRoute);
app.use("/api/gear", gearRoute);
app.use("/api/provider", authMiddleware(Role.PROVIDER), providerRoute);
app.use("/api/category", categoryRoute);
app.use("/api/admin", authMiddleware(Role.ADMIN), adminRoute);
app.use("/api/rental", rentalRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/review", reviewRoute);
app.use("/api/profile", authMiddleware(Role.CUSTOMER, Role.PROVIDER, Role.ADMIN), profileRoute);



app.use(globalErrorHandler)

export default app;