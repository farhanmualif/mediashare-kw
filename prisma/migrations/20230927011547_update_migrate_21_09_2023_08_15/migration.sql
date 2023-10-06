/*
  Warnings:

  - You are about to drop the column `fromSecondTo` on the `media` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `media` DROP COLUMN `fromSecondTo`,
    MODIFY `startAtSecond` VARCHAR(191) NOT NULL DEFAULT '5';
