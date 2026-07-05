import { Request, Response } from "express";
import { authService } from "./auth.service";
import httpstatus from "http-status";
import { AppError } from "../../global/apperror";

const registerUser = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const user = await authService.registerUserIntoDB(payload);
    res.status(httpstatus.CREATED).json({
      success: true,
      statusCode: httpstatus.CREATED,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        success: false,
        statusCode: error.statusCode,
        message: error.message,
        data: {},
      });
    }
  }
};
const loginUser = async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: {},
  });
};
const getLoggedInUser = async (req: Request, res: Response) => {};

export const authController = {
  registerUser,
  loginUser,
  getLoggedInUser,
};
