import { Request, Response } from "express";
import { AppError } from "../../global/apperror.js";
import { providerService } from "./provider.service.js";
import httpStatus from "http-status";

const createGear = async (req: Request, res: Response) => {
    const { name, description, price, quantity, brand, category_name } = req.body;
    const { id, email } = req.user!;
    if (typeof price !== "number" || typeof quantity !== "number" || quantity < 0){
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "Price and quantity must be non-negative numbers."
        )
    }
    if (!name || !quantity || !price || !category_name || !quantity || !brand) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Name, quantity, price, brand, and category name are required.",
      );
    }
    const payload = {
      name,
      description,
      price,
      quantity,
      brand, 
      category_Name: category_name,
      provider_id: id,
      provider_email: email,
    };
  try {
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
const getAllOrders = async () => {};
const updateOrderById = async () => {};
export const providerController = {
  createGear,
  updateGearById,
  removeGearById,
  getAllOrders,
  updateOrderById,
};
