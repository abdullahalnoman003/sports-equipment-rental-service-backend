/*
  Warnings:

  - You are about to drop the column `category_Id` on the `Gears` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category_Name` to the `Gears` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Gears" DROP CONSTRAINT "Gears_category_Id_fkey";

-- DropIndex
DROP INDEX "Gears_category_Id_idx";

-- AlterTable
ALTER TABLE "Gears" DROP COLUMN "category_Id",
ADD COLUMN     "category_Name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Categories_name_key" ON "Categories"("name");

-- AddForeignKey
ALTER TABLE "Gears" ADD CONSTRAINT "Gears_category_Name_fkey" FOREIGN KEY ("category_Name") REFERENCES "Categories"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
