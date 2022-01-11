import { MigrationInterface, QueryRunner } from 'typeorm';

export class addTask1641904411323 implements MigrationInterface {
    name = 'addTask1641904411323'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE `mailaddress` (`id` varchar(255) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `userId` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, UNIQUE INDEX `IDX_d386c5ec3202e53631eea24740` (`userId`), PRIMARY KEY (`id`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `task` (`id` varchar(255) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `name` varchar(255) NOT NULL, `dueDate` datetime NOT NULL, `postponeCount` int NOT NULL, `status` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE `task`');
        await queryRunner.query('DROP INDEX `IDX_d386c5ec3202e53631eea24740` ON `mailaddress`');
        await queryRunner.query('DROP TABLE `mailaddress`');
    }

}
