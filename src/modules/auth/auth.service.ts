import config from "../../config/index.js";
import { AppError } from "../../global/apperror.js";
import { prisma } from "../../lib/prisma.js";
import {
  IGoogleUser,
  ILoginUser,
  IRegisterUser,
  UserInfo,
} from "./auth.interface.js";
import bcrypt from "bcryptjs";
import { OAuth2Client, type TokenPayload } from "google-auth-library";
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
const signTokens = (user: { id: string; email: string; role: string }) => {
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

  // Google accounts have no local password, so bcrypt has nothing to compare.
  if (!user.password) {
    throw new AppError(
      httpstatus.UNAUTHORIZED,
      "This account uses Google sign-in. Please continue with Google.",
    );
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    throw new AppError(httpstatus.UNAUTHORIZED, "Invalid password");
  }

  return signTokens(user);
};

const googleLoginIntoDB = async (payload: IGoogleUser) => {
  const { idToken, role } = payload;

  if (!config.google_client_id) {
    throw new AppError(
      httpstatus.SERVICE_UNAVAILABLE,
      "Google sign-in is not configured on the server.",
    );
  }
  if (!idToken) {
    throw new AppError(httpstatus.BAD_REQUEST, "Google ID token is required");
  }

  const client = new OAuth2Client(config.google_client_id);
  let payload2: TokenPayload | undefined;

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: config.google_client_id,
    });
    payload2 = ticket.getPayload();
  } catch {
    throw new AppError(httpstatus.UNAUTHORIZED, "Invalid Google ID token");
  }

  if (!payload2?.email) {
    throw new AppError(
      httpstatus.UNAUTHORIZED,
      "Your Google account does not expose an email address.",
    );
  }

  const email = payload2.email.toLowerCase();
  const verifiedEmail = payload2.email_verified === true;

  const existing = await prisma.user.findUnique({
    where: { email },
    include: { profile: true },
  });

  if (existing?.status === "SUSPENDED") {
    throw new AppError(
      httpstatus.FORBIDDEN,
      "Your account has been suspended. Please contact support for assistance.",
    );
  }

  // Never silently link an unverified Google email to an existing account.
  if (existing && !verifiedEmail) {
    throw new AppError(
      httpstatus.UNAUTHORIZED,
      "Your Google email address is not verified. Please verify it and try again.",
    );
  }

  const displayName = payload2.name ?? (email.split("@")[0] ?? email);
  const avatar = payload2.picture;

  const user = existing
    ? await prisma.user.update({
        where: { id: existing.id },
        data: {
          authProvider: "GOOGLE",
          ...(payload2.name ? { name: payload2.name } : {}),
          ...(avatar && !existing.profile?.profile_picture
            ? {
                profile: {
                  update: { profile_picture: avatar },
                },
              }
            : {}),
        },
      })
    : await prisma.user.create({
        data: {
          name: displayName,
          email,
          password: null,
          role: role ?? "CUSTOMER",
          authProvider: "GOOGLE",
          profile: {
            create: {
              profile_picture: avatar ?? "",
              address: "",
              phone_number: "",
            },
          },
        },
      });

  return signTokens(user);
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
  googleLoginIntoDB,
  loggedInUserInfo
};
