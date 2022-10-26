/*
  Warnings:

  - You are about to drop the column `CodMsg` on the `MessagesReceive` table. All the data in the column will be lost.
  - You are about to drop the column `Errormessage` on the `MessagesReceive` table. All the data in the column will be lost.
  - You are about to drop the column `CodMsg` on the `MessagesSend` table. All the data in the column will be lost.
  - You are about to drop the column `Errormessage` on the `MessagesSend` table. All the data in the column will be lost.
  - Added the required column `codMsg` to the `MessagesReceive` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codMsg` to the `MessagesSend` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MessagesReceive" DROP COLUMN "CodMsg",
DROP COLUMN "Errormessage",
ADD COLUMN     "codMsg" TEXT NOT NULL,
ADD COLUMN     "error" TEXT;

-- AlterTable
ALTER TABLE "MessagesSend" DROP COLUMN "CodMsg",
DROP COLUMN "Errormessage",
ADD COLUMN     "codMsg" TEXT NOT NULL,
ADD COLUMN     "error" TEXT;
