import { Request, Response } from "express";
import { AppError } from "../../global/apperror.js";
import { providerService } from "./provider.service.js";
import httpStatus from "http-status";

const createGear = async (req: Request, res: Response) => {
  try {
    const { name, description, price, quantity, category_name } = req.body;
    const { email } = req.user!;

    if (typeof price !== "number" || typeof quantity !== "number" || quantity < 0){
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "Price and quantity must be non-negative numbers."
        )
    }
    if (!name || !quantity || !price || !category_name || !quantity) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Name, quantity, price and category name are required.",
      );
    }
    const payload = {
      name,
      description,
      price,
      quantity,
      category_Name: category_name,
      provider_email: email,
    };

    const gear = await providerService.createGearIntoDB(payload);
    res.status(httpStatus.CREATED).json({
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Gear created successfully",
      data: gear,
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

const updateGearById = async () => {};
const removeGearById = async () => {};
export const providerController = {
  createGear,
  updateGearById,
  removeGearById,
};
