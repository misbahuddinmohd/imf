-- CreateEnum
CREATE TYPE "statusType" AS ENUM ('Available', 'Deployed', 'Destroyed', 'Decommissioned');

-- CreateTable
CREATE TABLE "Gadgets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "statusType" NOT NULL DEFAULT 'Available',
    "statusTimeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Gadgets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Gadgets_id_key" ON "Gadgets"("id");
