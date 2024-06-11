-- CreateTable
CREATE TABLE `invoice` (
    `id` INTEGER NOT NULL,
    `storyId` INTEGER NOT NULL,
    `createAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`, `storyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sevicepackage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `description` VARCHAR(200) NOT NULL,
    `expiration` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sevicepackageprice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `price` FLOAT NOT NULL,
    `startTime` DATETIME(0) NOT NULL,
    `createAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `servicePackageID` INTEGER NOT NULL,

    INDEX `fk_service_package_idx`(`servicePackageID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sevicepackagetransaction` (
    `SevicePackageId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `createAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`SevicePackageId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wallet` (
    `id` INTEGER NOT NULL,
    `balance` FLOAT NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `walletrechargetransaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` FLOAT NOT NULL DEFAULT 0,
    `createAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sevicepackageprice` ADD CONSTRAINT `fk_service_package` FOREIGN KEY (`servicePackageID`) REFERENCES `sevicepackage`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `sevicepackagetransaction` ADD CONSTRAINT `fk_id_service_package` FOREIGN KEY (`SevicePackageId`) REFERENCES `sevicepackage`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
