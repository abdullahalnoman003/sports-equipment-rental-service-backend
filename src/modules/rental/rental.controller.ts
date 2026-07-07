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
            status: "success",
            message: "Rental created successfully",
            data: rental,
        });
    } catch (error) {
        console.error("Error creating rental:", error);
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create rental...");
    }
}

const getRentals = async ()=>{
    
}
const getRentalsById = async ()=>{
}

export const rentalController = {
    createRental,
    getRentals,
    getRentalsById
}