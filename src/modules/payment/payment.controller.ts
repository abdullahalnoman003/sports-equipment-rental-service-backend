import { Request, Response } from "express";
import { paymentService } from "./payment.service";
import httpStatus from "http-status";
import { AppError } from "../../global/apperror";

const createPaymentIntent = async (req: Request, res: Response) => {
    
    const userId = req.user!.id;
    const rentalId = req.body.rentalId;

    try {
        
        const result = await paymentService.createPaymentIntoDB(userId as string, rentalId as string);
        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "Checkout successful",
            data: result,
        });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: "Failed to create payment intent",
            data: {error: "Unknown error Or Duplicate payment"},
        });
    }
};
const confirmPayment = async (req: Request, res: Response) => {

    try {
        const event = req.body  as Buffer;
    const signature = req.headers["stripe-signature"]!;
    await paymentService.confirmPaymentIntoDB(event, signature as string);
    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: "Checkout successful",
        data: null,
    });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: "Failed to create payment intent",
            data: {},
        });
    }

    
}
const getAllPayments = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    try {
        const result = await paymentService.getAllPaymentFromDB(userId as string);
        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "Payments retrieved successfully",
            data: result,
        });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: "Failed to retrieve payments",
            data: {},
        });
    }

}
const getPaymentById = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const paymentId = req.params.id;

    try {
        const result = await paymentService.getPaymentByIdFromDB(userId as string, paymentId as string);
        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "Payment retrieved successfully",
            data: result,
        });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: "Failed to retrieve payment",
            data: {},
        });
    }
}

export const paymentController = {
  createPaymentIntent,
  confirmPayment,
  getAllPayments,
  getPaymentById,
};