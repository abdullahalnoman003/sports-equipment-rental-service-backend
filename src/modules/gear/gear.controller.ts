import { Request, Response } from "express";
import { gearService } from "./gear.service.js";
import { AppError } from "../../global/apperror.js";
import httpStatus from "http-status";

const getAllGear = async (req: Request, res: Response)=>{
    try {
        const allGear = await gearService.getAllGearsFromDB(req.query);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "All gear fetched successfully",
            data: allGear,
        });
    } catch (error) {
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to fetch all gear");
    }
}
const getGearById = async (id: string) =>{

}

export const gearController ={
    getAllGear,
    getGearById
}