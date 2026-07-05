import config from "../../config";
import { AppError } from "../../global/apperror";
import { prisma } from "../../lib/prisma";
import { ILoginUser, IRegisterUser } from "./auth.interface";
import bcrypt from "bcryptjs";
import httpstatus from "http-status";

const registerUserIntoDB = async (payload: IRegisterUser) => {
  const { name, email, password, role } = payload;
  const roles = ["CUSTOMER", "PROVIDER"];
  if (!role) {
    throw new AppError(httpstatus.BAD_REQUEST, "Role is required.");
  }
  if (!roles.includes(role)) {
    throw new AppError(
      httpstatus.BAD_REQUEST,
      "Invalid role. Only CUSTOMER and PROVIDER are allowed. If You are a Admin Please contact with the Admin to create your account."
    );
  }
  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (isUserExist) {
    throw new AppError(httpstatus.CONFLICT, "User already exist");
  }

  const hasedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  const createUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hasedPassword,
      role,
    },
  });
  const user = await prisma.user.findUnique({
    where: {
      id: createUser.id,
    },
    omit: {
      password: true,
    },
  });
  return user;
};
const loginUserIntoDB = async (payload: ILoginUser) => {};
export const authService = {
  loginUserIntoDB,
  registerUserIntoDB,
};
