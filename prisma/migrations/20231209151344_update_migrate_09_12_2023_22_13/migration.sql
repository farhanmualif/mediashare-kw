-- CreateTable
CREATE TABLE `Token` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userUUID` VARCHAR(191) NOT NULL,
    `token` TEXT NOT NULL,

    UNIQUE INDEX `Token_userUUID_key`(`userUUID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Token` ADD CONSTRAINT `Token_userUUID_fkey` FOREIGN KEY (`userUUID`) REFERENCES `User`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
