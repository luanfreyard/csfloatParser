-- CreateTable
CREATE TABLE "FloatPrice" (
    "id" SERIAL NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FloatPrice_pkey" PRIMARY KEY ("id")
);
