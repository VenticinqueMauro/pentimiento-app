-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "thumbnailId" TEXT,
    "mainImageUrl" TEXT NOT NULL,
    "mainImageId" TEXT,
    "typeId" INTEGER,
    "director" TEXT,
    "producer" TEXT,
    "df" TEXT,
    "agency" TEXT,
    "videoLink" TEXT,
    "synopsis" TEXT,
    "description" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subtype" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "typeId" INTEGER,

    CONSTRAINT "Subtype_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Colorist" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "description" TEXT,
    "profileImg" TEXT,
    "portfolioImg" TEXT,

    CONSTRAINT "Colorist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gallery" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "publicId" TEXT,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "Gallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProjectSubtypes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProjectColorists" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Project_displayOrder_idx" ON "Project"("displayOrder");

-- CreateIndex
CREATE UNIQUE INDEX "Type_name_key" ON "Type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Subtype_name_key" ON "Subtype"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectSubtypes_AB_unique" ON "_ProjectSubtypes"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectSubtypes_B_index" ON "_ProjectSubtypes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectColorists_AB_unique" ON "_ProjectColorists"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectColorists_B_index" ON "_ProjectColorists"("B");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subtype" ADD CONSTRAINT "Subtype_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gallery" ADD CONSTRAINT "Gallery_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectSubtypes" ADD CONSTRAINT "_ProjectSubtypes_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectSubtypes" ADD CONSTRAINT "_ProjectSubtypes_B_fkey" FOREIGN KEY ("B") REFERENCES "Subtype"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectColorists" ADD CONSTRAINT "_ProjectColorists_A_fkey" FOREIGN KEY ("A") REFERENCES "Colorist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectColorists" ADD CONSTRAINT "_ProjectColorists_B_fkey" FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
