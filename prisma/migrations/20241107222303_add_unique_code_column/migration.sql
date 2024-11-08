/*
  Warnings:

  - A unique constraint covering the columns `[uniqueCode]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "uniqueCode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Project_uniqueCode_key" ON "Project"("uniqueCode");
