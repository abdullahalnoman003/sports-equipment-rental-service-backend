import { AppError } from "../../global/apperror.js";
import { prisma } from "../../lib/prisma.js";
import httpStatus from "http-status";
import { gear } from '../../../generated/prisma/index';

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

const deleteCategoryFromDB = async (id : string) => {
    const existingCategory = await prisma.category.findUnique({
        where: { id },
        include:{
            gears: true
        }
    });

    if (!existingCategory) {
        throw new AppError(httpStatus.NOT_FOUND, "Category not found");
    }

    if(existingCategory.gears.length > 0){
        throw new AppError(httpStatus.BAD_REQUEST, "Cannot delete category with associated gears");
    }
    const category = await prisma.category.delete({
        where: { id },
    });   
    return category;
}

const updateCategoryInDB = async ( id : string, name: string, description: string, image: string) => {
    const existingCategory = await prisma.category.findUnique({
        where: { id },
    });

    if (!existingCategory) {
        throw new AppError(httpStatus.NOT_FOUND, "Category not found");
    }

    const category = await prisma.category.update({
        where: { id },
        data: {
            name: name,
            description: description,
            image: image
        }
    });       
    return category;
}


export const categoryService = {
    getAllCategoriesFromDB,
    createCategoryIntoDB,
    deleteCategoryFromDB,
    updateCategoryInDB
}