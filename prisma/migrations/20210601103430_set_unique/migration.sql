/*
  Warnings:

  - You are about to drop the column `shopId` on the `CoffeeShopPhoto` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `CoffeeShop` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `coffeeShopId` to the `CoffeeShopPhoto` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CoffeeShopPhoto" DROP CONSTRAINT "CoffeeShopPhoto_shopId_fkey";

-- AlterTable
ALTER TABLE "CoffeeShopPhoto" DROP COLUMN "shopId",
ADD COLUMN     "coffeeShopId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CoffeeShop.name_unique" ON "CoffeeShop"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category.name_unique" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "CoffeeShopPhoto" ADD FOREIGN KEY ("coffeeShopId") REFERENCES "CoffeeShop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
