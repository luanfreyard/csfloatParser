/*
  Warnings:

  - You are about to drop the `FloatPrice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "FloatPrice";

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "marketHashName" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "weapon" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "pattern" TEXT NOT NULL,
    "wear" TEXT NOT NULL,
    "minFloat" DOUBLE PRECISION NOT NULL,
    "maxFloat" DOUBLE PRECISION NOT NULL,
    "isStatTrak" BOOLEAN NOT NULL,
    "isSouvenir" BOOLEAN NOT NULL,
    "rarity" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);
