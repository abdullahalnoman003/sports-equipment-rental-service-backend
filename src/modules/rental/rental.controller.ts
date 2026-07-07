import { Request, Response } from "express";
import { rentalService } from "./rental.service";
import httpStatus from "http-status";
import { AppError } from "../../global/apperror";

const createRental = async (req: Request, res: Response)=>{
    try {
        const {gear_id, start_date, end_date} = req.body;
        const {id, email, role} = req.user!;
        const payload = {user_id : id, email, role, gear_id, start_date : new Date(start_date), end_date : new Date(end_date)}
        const rental = await rentalService.createNewRentalIntoDB(payload)
        res.status(httpStatus.CREATED).json({
            success: true,
            statusCode: httpStatus.CREATED,
            message: "Rental created successfully",
            data: rental,
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

const getRentals = async (req: Request, res: Response)=>{
    try {
        const allRentals = await rentalService.getAllRentalsFromDB();
        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "Rentals fetched successfully",
            data: allRentals,
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

const getRentalsById = async (req: Request, res: Response)=>{
    try {
        const rental = await rentalService.getRentalByIdFromDB(req.params.id as string);
        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "Rental fetched successfully",
            data: rental,
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

export const rentalController = {
    createRental,
    getRentals,
    getRentalsById
}