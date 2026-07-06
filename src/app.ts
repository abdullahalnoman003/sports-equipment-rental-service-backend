import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import config from "./config/index.js";
import cors from "cors";
import { authRoute } from "./modules/auth/auth.route.js";

const app : Application = express();

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


export default app;