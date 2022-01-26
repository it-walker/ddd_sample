import {MigrationInterface, QueryRunner} from 'typeorm'

export class addClubAndStudent1643208049515 implements MigrationInterface {
    name = 'addClubAndStudent1643208049515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE `club` (`id` varchar(255) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `name` varchar(255) NOT NULL, `isApproval` tinyint NOT NULL, UNIQUE INDEX `IDX_79098e276529e2f823ab6379e8` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB')
await queryRunner.query('CREATE TABLE `student` (`id` varchar(255) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE `student`')
await queryRunner.query('DROP INDEX `IDX_79098e276529e2f823ab6379e8` ON `club`')
await queryRunner.query('DROP TABLE `club`')
    }

}
