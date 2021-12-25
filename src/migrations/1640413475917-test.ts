import { MigrationInterface, QueryRunner } from 'typeorm';

export class test1640413475917 implements MigrationInterface {
  name = 'test1640413475917';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `product` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `price` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `user` (`userId` varchar(36) NOT NULL, `fullName` varchar(100) NOT NULL, `email` varchar(100) NOT NULL, `password` varchar(255) NOT NULL, PRIMARY KEY (`userId`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `user_mail_address` (`user` int NOT NULL AUTO_INCREMENT, `mailAddress` varchar(255) NOT NULL, PRIMARY KEY (`user`)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `user_mail_address`');
    await queryRunner.query('DROP TABLE `user`');
    await queryRunner.query('DROP TABLE `product`');
  }
}
