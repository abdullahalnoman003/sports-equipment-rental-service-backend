import { Request, Response } from "express";
import { gearService } from "./gear.service.js";
import { AppError } from "../../global/apperror.js";
import httpStatus from "http-status";

const getAllGear = async (req: Request, res: Response)=>{
    try {
        const allGear = await gearService.getAllGearsFromDB(req.query);
        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "All gear fetched successfully",
            data: allGear,
        });
    } catch (error) {
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to fetch all gear");
    }
}
const getGearById = async (req: Request, res: Response) =>{
    try {
        const gear = await gearService.getGearByIdFromDB(req.params.id as string);
        if (!gear) {
            throw new AppError(httpStatus.NOT_FOUND, "Gear not found");
        }
        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "Gear fetched successfully",
            data: gear,
        });
    } catch (error) {
        throw new AppError(httpStatus.NOT_FOUND, "Failed to fetch gear by id");
    }
}

export const gearController ={
    getAllGear,
    getGearById
}