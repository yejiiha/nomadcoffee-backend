/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Category.slug_unique";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "githubUsername" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category.name_unique" ON "Category"("name");
