import { AppError } from "../../global/apperror.js";
import { prisma } from "../../lib/prisma.js";

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
    const existingReview = await prisma.review.findFirst({
        where:{
            rental_id: rentalId
        }
    })
    if(existingReview) {
        throw new AppError(400, "You have already reviewed this rental");
    }
    const review = await prisma.review.create({
        data:{
            user_id: userId,
            gear_id: rentalCheck.gear_id,
            rental_id: rentalId,
            rating,
            comment
        },
    }
)
    return review


};

/**
 * Public reviews for a single gear item, used by the product detail page.
 * Includes the reviewer so the UI can render a name and avatar without a
 * second request.
 */
const getReviewsByGear = async (gearId: string) => {
    if (!gearId) {
        throw new AppError(400, "gear_id is required");
    }

    const gear = await prisma.gear.findUnique({ where: { id: gearId } });
    if (!gear) {
        throw new AppError(404, "Gear not found");
    }

    const reviews = await prisma.review.findMany({
        where: { gear_id: gearId },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    profile: {
                        select: { profile_picture: true },
                    },
                },
            },
        },
        orderBy: { created_at: "desc" },
    });

    // Flat shape so the frontend can render it directly.
    return reviews.map((review) => ({
        id: review.id,
        user_id: review.user_id,
        gear_id: review.gear_id,
        rental_id: review.rental_id,
        rating: review.rating,
        comment: review.comment,
        created_at: review.created_at,
        updated_at: review.updated_at,
        reviewer_name: review.user?.name ?? null,
        reviewer_image: review.user?.profile?.profile_picture || null,
    }));
};

/**
 * Average rating for every gear item, keyed by gear id.
 *
 * Powers the rating filter on the listing page without one request per item.
 * Only items that actually have reviews are returned, so the UI can hide rating
 * data instead of showing a misleading zero.
 */
const getRatingSummary = async () => {
    const grouped = await prisma.review.groupBy({
        by: ["gear_id"],
        _avg: { rating: true },
        _count: { rating: true },
    });

    return grouped
        .filter((row) => row._count.rating > 0)
        .map((row) => ({
            gear_id: row.gear_id,
            average: Math.round((row._avg.rating ?? 0) * 10) / 10,
            total: row._count.rating,
        }));
};

export const reviewService = {
    reviewIntoDB,
    getReviewsByGear,
    getRatingSummary
}