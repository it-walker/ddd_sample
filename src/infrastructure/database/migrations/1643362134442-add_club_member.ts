import {MigrationInterface, QueryRunner} from 'typeorm'

export class addClubMember1643362134442 implements MigrationInterface {
    name = 'addClubMember1643362134442'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE `club` (`id` varchar(255) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `name` varchar(255) NOT NULL, `isApproval` tinyint NOT NULL, UNIQUE INDEX `IDX_79098e276529e2f823ab6379e8` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB')
await queryRunner.query('CREATE TABLE `club_member` (`id` varchar(255) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `clubId` varchar(255) NOT NULL, `studentId` varchar(255) NOT NULL, UNIQUE INDEX `IDX_1047687a2fa4d8aa55ce9ff46a` (`clubId`), UNIQUE INDEX `IDX_d0a6711fcce801ddc5e94cadb1` (`studentId`), PRIMARY KEY (`id`)) ENGINE=InnoDB')
await queryRunner.query('CREATE TABLE `student` (`id` varchar(255) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE `student`')
await queryRunner.query('DROP INDEX `IDX_d0a6711fcce801ddc5e94cadb1` ON `club_member`')
await queryRunner.query('DROP INDEX `IDX_1047687a2fa4d8aa55ce9ff46a` ON `club_member`')
await queryRunner.query('DROP TABLE `club_member`')
await queryRunner.query('DROP INDEX `IDX_79098e276529e2f823ab6379e8` ON `club`')
await queryRunner.query('DROP TABLE `club`')
    }

}
