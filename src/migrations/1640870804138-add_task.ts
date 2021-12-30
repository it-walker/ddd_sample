import { MigrationInterface, QueryRunner } from 'typeorm';

export class addTask1640870804138 implements MigrationInterface {
  name = 'addTask1640870804138';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `product` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `price` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `task` (`id` varchar(36) NOT NULL, `name` varchar(100) NOT NULL, `taskStatus` varchar(255) NOT NULL, `dueDate` datetime NOT NULL, `postponeCount` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query('ALTER TABLE `user` ADD `age` int NOT NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `user` DROP COLUMN `age`');
    await queryRunner.query('DROP TABLE `task`');
    await queryRunner.query('DROP TABLE `product`');
  }
}
