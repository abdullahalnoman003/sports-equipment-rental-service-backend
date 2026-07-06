import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status";

import config from "../config/index.js";
import { prisma } from "../lib/prisma.js";
import { AppError } from "../global/apperror.js";
import { UserInfo } from "../modules/auth/auth.interface.js";
import { Role } from "../../generated/prisma/index.js";

interface JwtUserPayload extends JwtPayload {
  id: string;
  email: string;
  role: Role;
}

const authMiddleware = (...roles: Role[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.cookies?.accessToken;

      if (!accessToken) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "Access token is required. Please login again.",
        );
      }

      const decoded = jwt.verify(
        accessToken,
        config.jwt_access_secret,
      ) as JwtUserPayload;

      const user = await prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
      });

      if (!user) {
        throw new AppError(httpStatus.UNAUTHORIZED, "User not found.");
      }

      if (roles.length && !roles.includes(user.role)) {
        throw new AppError(
          httpStatus.FORBIDDEN,
          "You are not authorized to access this resource.",
        );
      }

      req.user = {
        id: user.id,
        email: user.email,
        role: user.role,
      } as UserInfo;

      next();
    } catch (error) {
      if (
        error instanceof jwt.TokenExpiredError || error instanceof jwt.JsonWebTokenError
      ) {
        return next(
          new AppError(
            httpStatus.UNAUTHORIZED,
            "Invalid or expired access token.",
          ),
        );
      }

      next(error);
    }
  };

export default authMiddleware;
