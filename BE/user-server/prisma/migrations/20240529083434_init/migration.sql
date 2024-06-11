-- CreateTable
CREATE TABLE `account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(40) NULL,
    `email` VARCHAR(50) NULL,
    `accessToken` VARCHAR(700) NULL,
    `refreshToken` VARCHAR(700) NULL,
    `password` VARCHAR(200) NULL,
    `veryfied` TINYINT NOT NULL DEFAULT 0,
    `role` VARCHAR(10) NOT NULL DEFAULT 'user',
    `provider` VARCHAR(14) NOT NULL DEFAULT 'email_password',

    UNIQUE INDEX `uid_UNIQUE`(`uid`),
    UNIQUE INDEX `email_UNIQUE`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `displayName` VARCHAR(50) NOT NULL,
    `photoURL` VARCHAR(500) NOT NULL,
    `accountId` INTEGER NOT NULL,

    UNIQUE INDEX `idAccount_UNIQUE`(`accountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
