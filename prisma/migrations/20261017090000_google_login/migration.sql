-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('LOCAL', 'GOOGLE');

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "authProvider" "AuthProvider" NOT NULL DEFAULT 'LOCAL';

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "password" DROP NOT NULL;