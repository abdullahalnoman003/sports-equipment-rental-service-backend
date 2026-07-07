import { Request, Response } from "express";
import { profileService } from "./profile.service"
import httpStatus from "http-status";
import { AppError } from "../../global/apperror";

const updateProfile = async (req: Request, res: Response) => {
    const { id: userId } = req.user!;
    const { name, profile_picture , phone_number, address } = req.body;
    try {
        const updatedProfile = await profileService.updateProfileByIdInDB(userId, name, profile_picture, phone_number, address);
        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "Profile updated successfully",
            data: updatedProfile,
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

export const profileController = {
    updateProfile,
};