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

const createCategory = async (req: Request, res: Response) => {
  const { name, description, image } = req.body;
  try {

    const category = await categoryService.createCategoryIntoDB( name, description, image );
    res.status(httpStatus.CREATED).json({
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Category created successfully",
      data: category,
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
}


export const categoryController = {
  getAllCategory,
  createCategory
};
