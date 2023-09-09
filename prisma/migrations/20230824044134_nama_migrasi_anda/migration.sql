/*
  Warnings:

  - You are about to drop the column `type` on the `media` table. All the data in the column will be lost.
  - You are about to drop the `usermedia` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `receiverId` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `usermedia` DROP FOREIGN KEY `UserMedia_reciverId_fkey`;

-- DropForeignKey
ALTER TABLE `usermedia` DROP FOREIGN KEY `UserMedia_senderId_fkey`;

-- AlterTable
ALTER TABLE `media` DROP COLUMN `type`,
    ADD COLUMN `receiverId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `usermedia`;

-- AddForeignKey
ALTER TABLE `Media` ADD CONSTRAINT `Media_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `User`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
