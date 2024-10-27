/*
  Warnings:

  - You are about to drop the `Proyect` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProyectColorists` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `proyectId` on the `Gallery` table. All the data in the column will be lost.
  - Added the required column `projectId` to the `Gallery` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_ProyectColorists_B_index";

-- DropIndex
DROP INDEX "_ProyectColorists_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Proyect";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ProyectColorists";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "mainImageUrl" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "subtype" TEXT,
    "director" TEXT,
    "producer" TEXT,
    "cinematographer" TEXT,
    "agency" TEXT,
    "videoLink" TEXT,
    "synopsis" TEXT,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "_ProjectColorists" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ProjectColorists_A_fkey" FOREIGN KEY ("A") REFERENCES "Colorist" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProjectColorists_B_fkey" FOREIGN KEY ("B") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Gallery" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "Gallery_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Gallery" ("id", "url") SELECT "id", "url" FROM "Gallery";
DROP TABLE "Gallery";
ALTER TABLE "new_Gallery" RENAME TO "Gallery";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectColorists_AB_unique" ON "_ProjectColorists"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectColorists_B_index" ON "_ProjectColorists"("B");
