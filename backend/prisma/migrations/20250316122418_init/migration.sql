-- CreateTable
CREATE TABLE `User` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(191) NOT NULL,
    `login` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_login_key`(`login`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `event_id` INTEGER NOT NULL AUTO_INCREMENT,
    `event_name` VARCHAR(191) NOT NULL,
    `category_name` VARCHAR(191) NULL,
    `event_date` DATETIME(3) NULL,
    `location` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL DEFAULT 'Без названия',
    `favorite` INTEGER NULL,

    PRIMARY KEY (`event_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `category_name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`category_name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Favorite` (
    `favorite_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `event_id` INTEGER NOT NULL,

    INDEX `Favorite_user_id_idx`(`user_id`),
    INDEX `Favorite_event_id_idx`(`event_id`),
    PRIMARY KEY (`favorite_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_category_name_fkey` FOREIGN KEY (`category_name`) REFERENCES `Category`(`category_name`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `Event`(`event_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
