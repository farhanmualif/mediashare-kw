/*
  Warnings:

  - You are about to drop the column `nominal` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `media` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `media` DROP COLUMN `nominal`,
    DROP COLUMN `paymentMethod`;

-- CreateTable
CREATE TABLE `Payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `method` VARCHAR(191) NOT NULL,
    `grossAmount` INTEGER NOT NULL,

    UNIQUE INDEX `Payment_uuid_key`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
