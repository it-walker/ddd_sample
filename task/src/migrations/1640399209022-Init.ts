import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1640399209022 implements MigrationInterface {
  name = 'Init1640399209022';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `product` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `price` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `user_mail_address` (`user` int NOT NULL AUTO_INCREMENT, `mailAddress` varchar(255) NOT NULL, PRIMARY KEY (`user`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `user` (`userId` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`userId`)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `user`');
    await queryRunner.query('DROP TABLE `user_mail_address`');
    await queryRunner.query('DROP TABLE `product`');
  }
}
