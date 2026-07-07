import { prisma } from "../../lib/prisma";

const updateProfileByIdInDB = async (userId: string, name: string, profile_picture: string, phone_number: string, address: string) => {
    const updatedProfile = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            name: name,
            profile :{
                update: {
                    profile_picture: profile_picture,
                    phone_number: phone_number,
                    address: address,
                }
            }
        },
    });

    const userWithProfile = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        omit: {
            password: true,
            createdAt: true,
            updatedAt: true,
        },
        include: {
            profile: true,
        },
    });
    return userWithProfile;
}

export const profileService = { updateProfileByIdInDB }