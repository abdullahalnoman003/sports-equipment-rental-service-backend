import { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";

const getAllGearsFromDB = async (query : any) => {

    const where: any = {};
    if (query.brand) {
        where.brand = { contains: query.brand, mode: "insensitive" };
    }
    if (query.category) {
        where.category_Name = { contains: query.category, mode: "insensitive" };
    }
    if (query.minimumPrice || query.maximumPrice) {
        where.price = {};
        if (query.minimumPrice) {
            where.price.gte = Number(query.minimumPrice);
        }
        if (query.maximumPrice) {
            where.price.lte = Number(query.maximumPrice);
        }
    }
    console.log(where);
    return await prisma.gear.findMany({ where });

    // const gear = await prisma.gear.findMany(
    //     {
    //         where: {    
    //                 {brand: { contains: query.brand, mode: "insensitive" } },
    //                 {category_Name: { contains: query.category, mode: "insensitive" } },
    //                 {price: { gte: Number(query.minimumPrice) } },
    //                 {price: { lte: Number(query.maximumPrice) } }
    //         }
    //     }
    // );

}
const getGearByIdFromDB = async (id: string) => {

}
export const gearService = {    
    getAllGearsFromDB ,
    getGearByIdFromDB
}