import { Request, Response } from "express";
import { AppError } from "../../global/apperror.js";
import { categoryService } from "./category.service.js";
import httpStatus from "http-status";

const getAllCategory = async (req : Request, res: Response) => {
  try {
    const cat = await categoryService.getAllCategoriesFromDB();
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Categories fetched successfully",
      data: cat,
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to fetch categories");
  }
};

export const categoryController = {
  getAllCategory,
};
