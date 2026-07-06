import { prisma } from "../../lib/prisma.js";

const getAllUserFromDB = async () => {
    const users = await prisma.user.findMany();
    return users;
}
const updateUserByIdInDB = async () => {}

const getAllGearFromDB = async () => {
    const gear = await prisma.gear.findMany();
    return gear;
}
const getAllRentalOrdersFromDB = async () => {
}

export const adminService = {
    getAllUserFromDB,
    updateUserByIdInDB,
    getAllGearFromDB,
    getAllRentalOrdersFromDB
}