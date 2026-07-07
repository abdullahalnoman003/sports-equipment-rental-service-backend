import { RentalStatus } from "../../../generated/prisma/index.js";
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

const GetAllOrdersFromDB = async (providerId: string) => {

  const orders = await prisma.rental.findMany({
    where: {
      gear: {
        provider_id: providerId,
      },
    },
    include: {
      gear: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      payment: true,
    },
  })
  if ( orders.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, "No orders found for this provider");
  }
  return orders;
}

const UpdateOrderByIdInDB = async (providerId: string, orderId: string, status: | "PAID"| "PLACED"| "CONFIRMED"| "CANCELED"| "PICKED_UP"| "RETURNED") => {
  
  const order = await prisma.rental.findUnique({
    where: {
      id: orderId,
    },
    include: {
      gear: true,
    },
  });

  if(order?.gear.provider_id !== providerId){
    throw new AppError(httpStatus.FORBIDDEN, "You are not authorized to update this order");
  }
  if (!order) {
    throw new AppError(httpStatus.NOT_FOUND, "Order not found");
  }
  const updatedOrder = await prisma.rental.update({
    where: {
      id: orderId,
    },
    data: {
      status,
    },
  });
  if (!updatedOrder) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to update order");
  }
  return updatedOrder;
  
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
