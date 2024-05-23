-- CreateTable
CREATE TABLE "Stocks" (
    "id" SERIAL NOT NULL,
    "instrumentKey" TEXT NOT NULL,
    "exchangeToken" INTEGER NOT NULL,
    "symbol" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "exchange" TEXT NOT NULL,

    CONSTRAINT "Stocks_pkey" PRIMARY KEY ("id")
);
