import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { UserDomain } from '@src/domain/user.domain';
import { User } from '@src/entities/user.entity';
import { UserMailAddress } from '@src/entities/userMailAddress.entity';
import { ICreateUserUseCase } from '@src/interfaces/users/usecases/create.user.service.usecase';
import { Connection, Repository } from 'typeorm';

@Injectable()
/**
 * CreateUserService class
 */
export class CreateUserService implements ICreateUserUseCase {
  /**
   * constructor
   * @param {Repository<User>} usersRepository
   * @param {UserMailAddress} userMailAddressRepository
   * @param {Connection} connection
   */
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(UserMailAddress)
    private userMailAddressRepository: Repository<UserMailAddress>,
    @InjectConnection()
    private connection: Connection,
  ) {}

  /**
   * ユーザーを作成します
   * @param {UserDomain} user - ユーザーエンティティ
   * @return {Promise<UserDomain>} 登録したユーザー
   */
  async create(user: UserDomain): Promise<UserDomain> {
    return this.connection.transaction(async (manager) => {
      const usersRepository = manager.getRepository(User);
      const userMailAddressRepository = manager.getRepository(UserMailAddress);

      for (const mail of user.mailAddresses) {
        await userMailAddressRepository.save(mail);
      }
      return await usersRepository.save(user);
    });
  }
}
