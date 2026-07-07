import { Request, Response } from "express";
import { AppError } from "../../global/apperror.js";
import { providerService } from "./provider.service.js";
import httpStatus from "http-status";

const createGear = async (req: Request, res: Response) => {
    const { name, description, price, image, quantity, brand, category_name } = req.body;
    const { id, email } = req.user!;
    if (typeof price !== "number" || typeof quantity !== "number" || quantity < 0){
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "Price and quantity must be non-negative numbers."
        )
    }
    if (!name || !quantity || !price || !category_name  || !brand) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Name, quantity, price, brand, and category name are required.",
      );
    }
    const payload = {
      name,
      description,
      price,
      image: image || null,
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

const updateGearById = async (req: Request, res: Response) => {
  const gearId = req.params.id;
  const { name, description, price,image, quantity, brand, category_name } = req.body;
  const { id: user_id } = req.user!;
  if (typeof price !== "number" || typeof quantity !== "number" || quantity < 0){
    throw new AppError(
        httpStatus.BAD_REQUEST,
        "Price and quantity must be non-negative numbers."
    )
  }
  if (!name || !quantity || !price || !category_name  || !brand) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Name, quantity, price, brand, and category name are required.",
    );
  }
  const payload = {
    name,
    description,
    price,
    image,
    quantity,
    brand, 
    category_Name: category_name,
  };
  try {
    const updatedGear = await providerService.UpdateGearByIdInDB(user_id, gearId as string, payload);
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Gear updated successfully",
      data: updatedGear,
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
const getAllGear = async (req: Request, res: Response) => {
  try {
    const allGear = await providerService.getAllGearFromDB();
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "All gear fetched successfully",
      data: allGear,
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


const removeGearById = async (req: Request, res: Response) => {
  const gearId = req.params.id;
  if (!gearId) {
    throw new AppError(httpStatus.BAD_REQUEST, "Gear ID is required");
  }
  const { id: user_id } = req.user!;
  try {
    const removedGear = await providerService.RemoveGearByIdInDB(user_id, gearId as string);
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Gear removed successfully",
      data: removedGear,
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
const getAllOrders = async (req: Request, res: Response) => {};
const updateOrderById = async (req: Request, res: Response) => {};
export const providerController = {
  getAllGear,
  createGear,
  updateGearById,
  removeGearById,
  getAllOrders,
  updateOrderById,
};
