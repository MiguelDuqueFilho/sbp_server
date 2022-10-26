/*
  Warnings:

  - The `error` column on the `MessagesReceive` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `error` column on the `MessagesSend` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "MessagesReceive" DROP COLUMN "error",
ADD COLUMN     "error" JSONB;

-- AlterTable
ALTER TABLE "MessagesSend" DROP COLUMN "error",
ADD COLUMN     "error" JSONB;
