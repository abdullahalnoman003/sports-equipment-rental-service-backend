import { AppError } from "../../global/apperror.js";
import { prisma } from "../../lib/prisma.js";
import { IGearData, IUpdateGearData } from "./provider.interface.js";
import httpStatus from "http-status";

const createGearIntoDB = async (gearData: IGearData) => {
  try {
    const {
    name,
    description,
    image,
    price,
    quantity,
    category_Name,
    brand,
    provider_email,
    provider_id,
} = gearData;

    const gear = await prisma.gear.create({
    data: {
        name,
        description,
        image: image || null,
        price,
        quantity,
        brand,
        category_Name,
        provider_email,
        provider_id,
    },
});
    return gear;
  } catch (error) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to create gear",
    );
  }
};

const UpdateGearByIdInDB = async (user_id:string, gearId : string , payload : IUpdateGearData) => {
  const gear = await prisma.gear.findUnique({
    where: {
      id: gearId,
    },
  });
  if (!gear) {
    throw new AppError(httpStatus.NOT_FOUND,"Gear not found",);
  }
  if (gear.provider_id !== user_id) {
    throw new AppError(httpStatus.FORBIDDEN,"You are not the owner of this gear",
    );
  }
  const updatedGear = await prisma.gear.update({
    where: {
      id: gearId,
    },
    data: payload,
  });
  if (!updatedGear) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR,"Failed to update gear",);
  }
  return updatedGear;
}

const RemoveGearByIdInDB = async (user_id:string, gearId : string) => {
  const gear = await prisma.gear.findUnique({
    where: {
      id: gearId,
    },
  });
  if (!gear) {
    throw new AppError(httpStatus.NOT_FOUND,"Gear not found",);
  }
  if (gear.provider_id !== user_id) {
    throw new AppError(httpStatus.FORBIDDEN,"You are not the owner of this gear",
    );
  }
  
  const removedGear = await prisma.$transaction(async (tx)=>{
    await tx.gear.delete({
      where:{
        id:gearId
      }
    })
  })
  return removedGear;
}

const GetAllOrdersFromDB = async () => {
  // Implementation for getting all orders
}

const UpdateOrderByIdInDB = async () => {
  
}

const getAllGearFromDB = async () => {
  try {
    const gear = await prisma.gear.findMany();
    return gear;
  } catch (error) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to fetch gear");
  }
};
export const providerService = {
  createGearIntoDB,
  UpdateGearByIdInDB,
  RemoveGearByIdInDB,
  GetAllOrdersFromDB,
  UpdateOrderByIdInDB,
  getAllGearFromDB
};
