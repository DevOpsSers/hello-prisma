-- CreateTable
CREATE TABLE "Home" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "tariff" DOUBLE PRECISION NOT NULL,
    "buffer" DOUBLE PRECISION,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Home_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeterReading" (
    "id" SERIAL NOT NULL,
    "visitorReading" DOUBLE PRECISION NOT NULL,
    "ownerReading" DOUBLE PRECISION NOT NULL,
    "visitorImage" TEXT NOT NULL,
    "ownerImage" TEXT NOT NULL,
    "visitorTimestamp" TIMESTAMP(3) NOT NULL,
    "ownerTimestamp" TIMESTAMP(3) NOT NULL,
    "homeId" INTEGER NOT NULL,

    CONSTRAINT "MeterReading_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Home" ADD CONSTRAINT "Home_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeterReading" ADD CONSTRAINT "MeterReading_homeId_fkey" FOREIGN KEY ("homeId") REFERENCES "Home"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
