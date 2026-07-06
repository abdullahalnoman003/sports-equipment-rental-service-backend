import { AppError } from "../../global/apperror.js";
import { prisma } from "../../lib/prisma.js";
import httpStatus from "http-status";

const getAllCategoriesFromDB = async () => {

        const categories = await prisma.category.findMany();

        return categories;
}   

export const categoryService = {
    getAllCategoriesFromDB
}