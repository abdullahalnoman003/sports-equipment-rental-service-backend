/*
  Warnings:

  - Added the required column `brand` to the `Gears` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gears" ADD COLUMN     "brand" TEXT NOT NULL;
