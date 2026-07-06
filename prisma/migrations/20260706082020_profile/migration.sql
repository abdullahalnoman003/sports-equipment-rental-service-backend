/*
  Warnings:

  - You are about to drop the column `address` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "address";

-- CreateTable
CREATE TABLE "Profiles" (
    "id" TEXT NOT NULL,
    "profile_picture" TEXT DEFAULT '',
    "address" TEXT DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profiles_user_id_key" ON "Profiles"("user_id");

-- AddForeignKey
ALTER TABLE "Profiles" ADD CONSTRAINT "Profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
