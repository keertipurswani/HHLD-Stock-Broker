/*
  Warnings:

  - You are about to drop the column `exchangeToken` on the `Stocks` table. All the data in the column will be lost.
  - You are about to drop the column `symbol` on the `Stocks` table. All the data in the column will be lost.
  - Added the required column `name` to the `Stocks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stocks" DROP COLUMN "exchangeToken",
DROP COLUMN "symbol",
ADD COLUMN     "name" TEXT NOT NULL;
