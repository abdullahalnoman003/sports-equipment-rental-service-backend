import { AppError } from "../../global/apperror.js";
import { prisma } from "../../lib/prisma.js";
import httpStatus from "http-status";

const getAllCategoriesFromDB = async () => {

        const categories = await prisma.category.findMany();

        return categories;
}   

const createCategoryIntoDB = async (name: string, description: string, image: string) => {
    
    const existingCategory = await prisma.category.findUnique({
        where: { name },
    });

    if (existingCategory) {
        throw new AppError(httpStatus.CONFLICT, "Category already exists");
    }

    const category = await prisma.category.create({
        data: {
            name: name,
            description: description,
            image: image
        }
    });
    if (!category) {
        throw new AppError(
            httpStatus.INTERNAL_SERVER_ERROR,
            "Failed to create category"
        );
    }
    return category;
}

export const categoryService = {
    getAllCategoriesFromDB,
    createCategoryIntoDB
}