-- AlterTable
ALTER TABLE "Reviews" ADD COLUMN     "rental_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_rental_id_key" ON "Reviews"("rental_id");

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_rental_id_fkey" FOREIGN KEY ("rental_id") REFERENCES "Rentals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
