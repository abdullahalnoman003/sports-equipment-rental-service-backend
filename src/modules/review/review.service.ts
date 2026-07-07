import { AppError } from "../../global/apperror";
import { prisma } from "../../lib/prisma";

const reviewIntoDB = async (userId: string, rating: number, comment: string, rentalId: string) => {

    const rentalCheck = await prisma.rental.findUnique({
        where:{
            id: rentalId
        }
    })
    if(!rentalCheck) {
        throw new AppError(404, "Rental not found");
    }
    if(rentalCheck?.user_id !== userId) {
        throw new AppError(403, "You are not authorized to review this rental");
    }
    if(rentalCheck?.status !== "RETURNED") {
        throw new AppError(400, "You can only review a rental after it has been returned");
    }
    const review = await prisma.review.create({
        data:{
            user_id: userId,
            gear_id: rentalCheck.gear_id,
            rating,
            comment
        },
    }
)       
    return review
    

};
export const reviewService = {
    reviewIntoDB
}