import { Request, Response } from "express";
import { authService } from "./auth.service.js";
import httpstatus from "http-status";
import { AppError } from "../../global/apperror.js";

const registerUser = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    if (!payload.name || !payload.email || !payload.password) {
      throw new AppError(
        httpstatus.BAD_REQUEST,
        "Name, email and password are required.",
      );
    }
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
  try {
    if (!req.body.email || !req.body.password) {
      throw new AppError(
        httpstatus.BAD_REQUEST, "Email and password are required.",
      );
    }
    const { accessToken, refreshToken } = await authService.loginUserIntoDB(
      req.body,
    );
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24, // for  1 day
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7, // for 7 day
    });

    res.status(httpstatus.OK).json({
      success: true,
      message: "User logged in successfully",
      data: { accessToken, refreshToken },
    });
  } catch (error) {
    if (error instanceof AppError) {
      {
        res.status(error.statusCode).json({
          success: false,
          statusCode: error.statusCode,
          message: error.message,
          data: {},
        });
      }
    }
  }
};
const getLoggedInUser = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const profile = await authService.loggedInUserInfo(user!.id);
    res.status(httpstatus.OK).json({
      success: true,
      statusCode: httpstatus.OK,
      message: "User profile fetched successfully",
      data: profile,
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

export const authController = {
  registerUser,
  loginUser,
  getLoggedInUser,
};
