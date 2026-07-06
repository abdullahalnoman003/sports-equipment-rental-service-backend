import { AppError } from "../../global/apperror.js";
import { categoryService } from "./category.service.js";
import httpStatus from "http-status";
const getAllCategory = async () => {
  try {
    const cat = await categoryService.getAllCategoriesFromDB();
    return cat;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to fetch categories");
  }
};

export const categoryController = {
  getAllCategory,
};
