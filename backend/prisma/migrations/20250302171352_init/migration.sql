/*
  Warnings:

  - A unique constraint covering the columns `[entityId,name]` on the table `Read` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Read_entityId_name_key" ON "Read"("entityId", "name");
