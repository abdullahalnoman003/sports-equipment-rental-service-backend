-- CreateTable
CREATE TABLE "Categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gears" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "provider_email" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "category_Id" TEXT NOT NULL,

    CONSTRAINT "Gears_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Gears_category_Id_idx" ON "Gears"("category_Id");

-- AddForeignKey
ALTER TABLE "Gears" ADD CONSTRAINT "Gears_category_Id_fkey" FOREIGN KEY ("category_Id") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
