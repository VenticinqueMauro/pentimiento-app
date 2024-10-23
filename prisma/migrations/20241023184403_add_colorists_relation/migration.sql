/*
  Warnings:

  - You are about to drop the column `coloristId` on the `Proyect` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_ProyectColorists" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ProyectColorists_A_fkey" FOREIGN KEY ("A") REFERENCES "Colorist" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProyectColorists_B_fkey" FOREIGN KEY ("B") REFERENCES "Proyect" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Proyect" (
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
INSERT INTO "new_Proyect" ("agency", "cinematographer", "description", "director", "id", "mainImageUrl", "producer", "subtype", "synopsis", "title", "type", "videoLink") SELECT "agency", "cinematographer", "description", "director", "id", "mainImageUrl", "producer", "subtype", "synopsis", "title", "type", "videoLink" FROM "Proyect";
DROP TABLE "Proyect";
ALTER TABLE "new_Proyect" RENAME TO "Proyect";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_ProyectColorists_AB_unique" ON "_ProyectColorists"("A", "B");

-- CreateIndex
CREATE INDEX "_ProyectColorists_B_index" ON "_ProyectColorists"("B");
