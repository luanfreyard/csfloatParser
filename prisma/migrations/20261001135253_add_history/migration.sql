-- CreateTable
CREATE TABLE "ItemHistory" (
    "id" SERIAL NOT NULL,
    "externalId" INTEGER NOT NULL,
    "skinId" INTEGER NOT NULL,
    "capturedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" INTEGER NOT NULL,
    "assetId" TEXT NOT NULL,
    "defIndex" INTEGER NOT NULL,
    "paintIndex" INTEGER NOT NULL,
    "paintSeed" INTEGER NOT NULL,
    "floatValue" DOUBLE PRECISION NOT NULL,
    "soldAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ItemHistory_externalId_key" ON "ItemHistory"("externalId");

-- CreateIndex
CREATE INDEX "ItemHistory_skinId_idx" ON "ItemHistory"("skinId");

-- AddForeignKey
ALTER TABLE "ItemHistory" ADD CONSTRAINT "ItemHistory_skinId_fkey" FOREIGN KEY ("skinId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
