/*
  Warnings:

  - You are about to drop the column `cinematographer` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "cinematographer",
ADD COLUMN     "df" TEXT;
