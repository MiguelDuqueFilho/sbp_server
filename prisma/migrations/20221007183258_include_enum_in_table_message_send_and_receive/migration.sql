/*
  Warnings:

  - You are about to drop the column `message_error` on the `MessagesReceive` table. All the data in the column will be lost.
  - You are about to drop the column `message_proc` on the `MessagesReceive` table. All the data in the column will be lost.
  - You are about to drop the column `status_msg` on the `MessagesReceive` table. All the data in the column will be lost.
  - You are about to drop the column `message_error` on the `MessagesSend` table. All the data in the column will be lost.
  - You are about to drop the column `message_proc` on the `MessagesSend` table. All the data in the column will be lost.
  - You are about to drop the column `status_msg` on the `MessagesSend` table. All the data in the column will be lost.
  - Changed the type of `xmlMessage` on the `MessagesReceive` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `xmlMessage` on the `MessagesSend` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "MsgProcessEnum" AS ENUM ('ACTIVE', 'PENDING', 'DISABLE');

-- CreateEnum
CREATE TYPE "MSgStatusEnum" AS ENUM ('VALIDATE', 'ERROR');

-- AlterTable
ALTER TABLE "MessagesReceive" DROP COLUMN "message_error",
DROP COLUMN "message_proc",
DROP COLUMN "status_msg",
ADD COLUMN     "Errormessage" TEXT,
ADD COLUMN     "process" "MsgProcessEnum" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "status" "MSgStatusEnum" NOT NULL DEFAULT 'VALIDATE',
DROP COLUMN "xmlMessage",
ADD COLUMN     "xmlMessage" XML NOT NULL;

-- AlterTable
ALTER TABLE "MessagesSend" DROP COLUMN "message_error",
DROP COLUMN "message_proc",
DROP COLUMN "status_msg",
ADD COLUMN     "Errormessage" TEXT,
ADD COLUMN     "process" "MsgProcessEnum" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "status" "MSgStatusEnum" NOT NULL DEFAULT 'VALIDATE',
DROP COLUMN "xmlMessage",
ADD COLUMN     "xmlMessage" XML NOT NULL,
ALTER COLUMN "dateRef" SET DEFAULT CURRENT_TIMESTAMP;
