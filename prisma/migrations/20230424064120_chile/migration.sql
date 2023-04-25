/*
  Warnings:

  - You are about to drop the column `todoId` on the `Todo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userEmail]` on the table `Todo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userEmail` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_todoId_fkey";

-- DropIndex
DROP INDEX "Todo_todoId_key";

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "todoId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Todo_userEmail_key" ON "Todo"("userEmail");

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
