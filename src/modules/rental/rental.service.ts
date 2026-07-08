import { AppError } from "../../global/apperror";
import { prisma } from "../../lib/prisma";
import { IRentalData } from "./rental.interface";

const createNewRentalIntoDB = async (payload: IRentalData) => {
    const { user_id, gear_id, start_date, end_date } = payload;
    const itemFound = await prisma.gear.findUnique({
        where: {
            id: gear_id,
        },
    });

    if (!itemFound) {
        throw new AppError(404, "Gear item not found");
    }

    if (itemFound.quantity < 1) {
        throw new AppError(400, "Gear item not available");
    }
    const rentalDays = Math.ceil(
        (end_date.getTime() - start_date.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (rentalDays <= 0) {
        throw new AppError(400, "End date must be after start date");
    }

    const rental = await prisma.$transaction(async (tx) => {
        const createdRental = await tx.rental.create({
            data: {
                user_id,
                gear_id,
                start_date,
                end_date,
                total_price: rentalDays * itemFound.price,
            },
            include: {
                gear: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });

        await tx.gear.update({
            where: {
                id: gear_id,
            },
            data: {
                quantity: {
                    decrement: 1,
                },
            },
        });

        return createdRental;
    });

    return rental;
};

const getAllRentalsFromDB = async (userId: string) => {
    const rentals = await prisma.rental.findMany({
        where: {
            user_id: userId
        },
        include: {
            user: {
                omit: {
                    password: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true
                }
            },
            gear: {
                omit: {
                    createdAt: true,
                    updatedAt: true
                }
            }
        }
    });
    if (rentals.length === 0) {
        throw new AppError(404, "No rentals found");
    }

    return rentals
}

const getRentalByIdFromDB = async (rentalId: string, id: string) => {
    const rental = await prisma.rental.findUnique({
        where: { id: rentalId },
        include: {
            user: {
                omit: {
                    password: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true
                }
            },
            gear: true
        }
    });

    if (!rental) {
        throw new AppError(404, "Rental not found");
    }

    if (rental.user_id !== id) {
        throw new AppError(403, "You are not authorized to view this rental");
    }
    return rental;
}
export const rentalService = {
    createNewRentalIntoDB,
    getAllRentalsFromDB,
    getRentalByIdFromDB
};
