import {MigrationInterface, QueryRunner} from 'typeorm';

export class test1641552975219 implements MigrationInterface {
  name = 'test1641552975219';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
        'CREATE TABLE `product` (`id` varchar(255) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
        'CREATE TABLE `user` (`id` varchar(255) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `email` varchar(255) NOT NULL, `country` varchar(255) NOT NULL, `postalCode` varchar(255) NOT NULL, `street` varchar(255) NOT NULL, `role` set (\'admin\', \'moderator\', \'guest\') NOT NULL DEFAULT \'guest\', UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
        'CREATE TABLE `wallet` (`id` varchar(255) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `balance` int NOT NULL DEFAULT \'0\', `userId` varchar(255) NOT NULL, UNIQUE INDEX `IDX_35472b1fe48b6330cd34970956` (`userId`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
        'DROP INDEX `IDX_35472b1fe48b6330cd34970956` ON `wallet`',
    );
    await queryRunner.query('DROP TABLE `wallet`');
    await queryRunner.query(
        'DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`',
    );
    await queryRunner.query('DROP TABLE `user`');
    await queryRunner.query('DROP TABLE `product`');
  }
}
