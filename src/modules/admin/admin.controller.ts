import { Request, Response } from "express";
import { adminService } from "./admin.service.js";
import httpStatus from "http-status";
import { AppError } from "../../global/apperror.js";
const getAllUser = async (req: Request, res: Response) => {
    try {
        const users = await adminService.getAllUserFromDB();
        res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Users fetched successfully",
      data: users,
    });
    } catch (error) {
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to fetch users");
    }
}
const updateUser= async () => {}

const getAllGear = async (req: Request, res: Response) => {
    try {
        const gear = await adminService.getAllGearFromDB();
        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "Gear fetched successfully",
            data: gear,
        });
    } catch (error) {
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to fetch gear");
    }
}
const getAllRentalOrders = async (req: Request, res: Response) => {
    try {
        const rentalOrders = await adminService.getAllRentalOrdersFromDB();
        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "Rental orders fetched successfully",
            data: rentalOrders,
        });
    } catch (error) {
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to fetch rental orders");
    }
}

export const adminController = {
    getAllUser,
    updateUser,
    getAllGear,
    getAllRentalOrders
}