/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Gadgets` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Gadgets_name_key" ON "Gadgets"("name");
