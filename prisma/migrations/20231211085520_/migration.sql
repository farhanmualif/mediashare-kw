-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `images` VARCHAR(191) NOT NULL DEFAULT 'default.png',
    `openDonation` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_uuid_key`(`uuid`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Media` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `nominal` INTEGER NOT NULL,
    `played` BOOLEAN NOT NULL DEFAULT false,
    `message` VARCHAR(191) NOT NULL,
    `linkMedia` VARCHAR(191) NOT NULL,
    `typeMedia` VARCHAR(191) NOT NULL,
    `startAtSecond` VARCHAR(191) NOT NULL DEFAULT '5',
    `duration` VARCHAR(191) NOT NULL DEFAULT '5000',
    `paymentMethod` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `receiverId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Media_uuid_key`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Token` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userUUID` VARCHAR(191) NOT NULL,
    `token` TEXT NOT NULL,

    UNIQUE INDEX `Token_userUUID_key`(`userUUID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Media` ADD CONSTRAINT `Media_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `User`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Token` ADD CONSTRAINT `Token_userUUID_fkey` FOREIGN KEY (`userUUID`) REFERENCES `User`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
