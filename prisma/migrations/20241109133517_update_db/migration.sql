/*
  Warnings:

  - You are about to drop the column `price` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `OrderItem` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Order_userId_key";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "price",
DROP COLUMN "size";
