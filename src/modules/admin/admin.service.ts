import { prisma } from "../../lib/prisma.js";

const getAllUserFromDB = async () => {
    const users = await prisma.user.findMany({
        where:{
            role :{
                not: "ADMIN"
            }
        },
        omit: {
            password: true,
            updatedAt: true,
        }, 
    }
    );
    return users;
}
const updateUserByIdInDB = async (user_id: string, status: "ACTIVE" | "SUSPENDED" | "INACTIVE" ) => {
    const updatedUser = await prisma.user.update({
        where: {
            id: user_id,
        },
        data: {
            status: status,
        },
        omit: {
            password: true,
            updatedAt: true,
        }, 
    });
        if (updatedUser) {
            return updatedUser;
        } else {
            throw new Error("User not found");
        }
    }

const getAllGearFromDB = async () => {
    const gear = await prisma.gear.findMany();
    return gear;
}
const getAllRentalOrdersFromDB = async () => {
    const rentalOrders = await prisma.rental.findMany({
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                }
            },
            gear: true
        }
    });
    return rentalOrders;
}

export const adminService = {
    getAllUserFromDB,
    updateUserByIdInDB,
    getAllGearFromDB,
    getAllRentalOrdersFromDB
}