-- CreateEnum
CREATE TYPE "Type" AS ENUM ('BASIC', 'SILVER', 'GOLD');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" "Type" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
