/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Category.name_unique";

-- CreateIndex
CREATE UNIQUE INDEX "Category.slug_unique" ON "Category"("slug");
