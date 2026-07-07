import config from "../../config/index.js";
import { AppError } from "../../global/apperror.js";
import { prisma } from "../../lib/prisma.js";
import { ILoginUser, IRegisterUser, UserInfo } from "./auth.interface.js";
import bcrypt from "bcryptjs";
import httpstatus from "http-status";
import jwt from "jsonwebtoken";

const registerUserIntoDB = async (payload: IRegisterUser) => {
  const { name, email, password, role } = payload;
  const roles = ["CUSTOMER", "PROVIDER"];
  if (!role) {
    throw new AppError(httpstatus.BAD_REQUEST, "Role is required.");
  }
  if (!roles.includes(role)) {
    throw new AppError(
      httpstatus.BAD_REQUEST,
      "Invalid role. Only CUSTOMER and PROVIDER are allowed. If You are a Admin Please contact with the Admin to create your account.",
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
      profile: {
        create: {
          profile_picture: "",
          address: "",
          phone_number: "",
        }
      },
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
const loginUserIntoDB = async (payload: ILoginUser) => {

  const { email, password } = payload;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new AppError(httpstatus.NOT_FOUND, "User not found");
  }
  if (user.status === "SUSPENDED") {
    throw new AppError(
      httpstatus.FORBIDDEN,
      "Your account has been suspended. Please contact support for assistance.",
    );
  }
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    throw new AppError(httpstatus.UNAUTHORIZED, "Invalid password");
  }

  const jwtPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret, {
    expiresIn: config.jwt_access_expires_in,
  } as jwt.SignOptions);


  const refreshToken = jwt.sign(jwtPayload, config.jwt_refresh_secret, {
    expiresIn: config.jwt_refresh_expires_in,
  } as jwt.SignOptions);


  return { accessToken, refreshToken };
};


const loggedInUserInfo = async (id: string) => {
  const userInfo = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
    },
    omit: {
      password: true,
    }
  })
  return userInfo;
};

export const authService = {
  loginUserIntoDB,
  registerUserIntoDB,
  loggedInUserInfo
};
