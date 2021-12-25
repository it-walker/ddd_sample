import { MigrationInterface, QueryRunner } from 'typeorm';

export class user1640441830624 implements MigrationInterface {
  name = 'user1640441830624';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `user_mail_address` (`id` int NOT NULL AUTO_INCREMENT, `value` varchar(255) NOT NULL, `userId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `user` (`id` varchar(36) NOT NULL, `name` varchar(100) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'ALTER TABLE `user_mail_address` ADD CONSTRAINT `FK_1d444eb3e2d5af8c042a92718ab` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `user_mail_address` DROP FOREIGN KEY `FK_1d444eb3e2d5af8c042a92718ab`',
    );
    await queryRunner.query('DROP TABLE `user`');
    await queryRunner.query('DROP TABLE `user_mail_address`');
  }
}
