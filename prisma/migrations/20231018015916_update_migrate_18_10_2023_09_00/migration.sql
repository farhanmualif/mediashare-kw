/*
  Warnings:

  - Added the required column `typeMedia` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `media` ADD COLUMN `typeMedia` VARCHAR(191) NOT NULL,
    MODIFY `duration` VARCHAR(191) NOT NULL DEFAULT '5000';
