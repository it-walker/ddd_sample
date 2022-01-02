import { MigrationInterface, QueryRunner } from 'typeorm';

export class taskModStatus1640943083426 implements MigrationInterface {
  name = 'taskModStatus1640943083426';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `task` CHANGE `taskStatus` `status` varchar(255) NOT NULL',
    );
    await queryRunner.query('ALTER TABLE `task` DROP COLUMN `status`');
    await queryRunner.query(
      'ALTER TABLE `task` ADD `status` varchar(255) NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `task` DROP COLUMN `status`');
    await queryRunner.query(
      'ALTER TABLE `task` ADD `status` varchar(255) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `task` CHANGE `status` `taskStatus` varchar(255) NOT NULL',
    );
  }
}
