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
const updateUser= async (req: Request, res: Response) => {
    const user_id  = req.params.id;
            const { status} = req.body;
            if(!user_id || !status) {
            throw new AppError(httpStatus.BAD_REQUEST, "user_id and status are required");
        }
        if(!["ACTIVE", "SUSPENDED", "INACTIVE"].includes(status)) {
            throw new AppError(httpStatus.BAD_REQUEST, "Invalid status value");
        }
    try {
        const updatedUser = await adminService.updateUserByIdInDB(user_id as string, status);
        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "User updated successfully",
            data: updatedUser,
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

export const adminController = {
    getAllUser,
    updateUser,
    getAllGear,
    getAllRentalOrders
}