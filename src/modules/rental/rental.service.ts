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

const getAllRentalsFromDB = async () => {
    const rentals = await prisma.rental.findMany({include:{user: true, gear: true}});
    return rentals
}

const getRentalByIdFromDB = async (id: string) => {
    const rental = await prisma.rental.findUniqueOrThrow({
        where: {id},
        include: {user: {
            omit : {
                password: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        },
            gear: true}
    });
    return rental;
}
export const rentalService = {
    createNewRentalIntoDB,
    getAllRentalsFromDB,
    getRentalByIdFromDB 
};
