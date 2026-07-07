import { Request, Response } from "express";
import { reviewService } from "./review.service";
import httpStatus from "http-status";
import { AppError } from "../../global/apperror";

const review = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { rating, comment, rentalId} = req.body;
    

    if(rating < 1 || rating > 5) {
        throw new AppError(httpStatus.BAD_REQUEST, "Rating must be between 1 and 5");
    }
    if(typeof rating !== "number") {
        throw new AppError(httpStatus.BAD_REQUEST, "Rating must be a number");
    }
    if( !rating || !rentalId) {
        throw new AppError(httpStatus.BAD_REQUEST, "gearId, rating and rentalId are required");
    }

    try {
        const review = await reviewService.reviewIntoDB(userId, rating, comment, rentalId );
        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "Review submitted successfully",
            data: review,
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

};

export const reviewController = {
    review,
};