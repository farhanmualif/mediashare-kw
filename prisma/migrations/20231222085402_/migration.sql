/*
  Warnings:

  - You are about to drop the column `receiverId` on the `media` table. All the data in the column will be lost.
  - Added the required column `recipientsName` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `media` DROP FOREIGN KEY `Media_receiverId_fkey`;

-- AlterTable
ALTER TABLE `media` DROP COLUMN `receiverId`,
    ADD COLUMN `recipientsName` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Media` ADD CONSTRAINT `Media_recipientsName_fkey` FOREIGN KEY (`recipientsName`) REFERENCES `User`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
