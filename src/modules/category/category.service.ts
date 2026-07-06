import { AppError } from "../../global/apperror.js";
import { prisma } from "../../lib/prisma.js";
import httpStatus from "http-status";

const getAllCategoriesFromDB = async () => {
    console.log("HELLO FROM BEGINNING");
        const categories = await prisma.category.findMany();
        console.log("HELLO FROM ");
        return categories;
}   

export const categoryService = {
    getAllCategoriesFromDB
}