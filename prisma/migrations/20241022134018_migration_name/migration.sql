-- CreateTable
CREATE TABLE "Proyect" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "mainImageUrl" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "subtype" TEXT,
    "coloristId" INTEGER NOT NULL,
    "director" TEXT,
    "producer" TEXT,
    "cinematographer" TEXT,
    "agency" TEXT,
    "videoLink" TEXT,
    "synopsis" TEXT,
    "description" TEXT,
    CONSTRAINT "Proyect_coloristId_fkey" FOREIGN KEY ("coloristId") REFERENCES "Colorist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Gallery" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "proyectId" INTEGER NOT NULL,
    CONSTRAINT "Gallery_proyectId_fkey" FOREIGN KEY ("proyectId") REFERENCES "Proyect" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Colorist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullname" TEXT NOT NULL,
    "description" TEXT,
    "profileImg" TEXT,
    "portfolioImg" TEXT
);
