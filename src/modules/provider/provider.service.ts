import { AppError } from "../../global/apperror.js";
import { prisma } from "../../lib/prisma.js";
import { IGearData } from "./provider.interface.js";
import httpStatus from "http-status";


const createGearIntoDB = async (gearData: IGearData ) => {

    try {
        const {name, description, price, quantity, category_Name, provider_email} = gearData;
        
        const gear = await prisma.gear.create({
        data:{
            name,
            description,
            price,
            quantity,
            category_Name,
            provider_email
        }
    })
    return gear;
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create gear");
    }
    
    
}

export const providerService = {
    createGearIntoDB
}