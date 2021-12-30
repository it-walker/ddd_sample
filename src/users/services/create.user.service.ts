import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { UserDomain } from '@/domain/user.domain';
import { User } from '@/entities/user.entity';
import { UserMailAddress } from '@/entities/userMailAddress.entity';
import { ICreateUserUseCase } from '@/interfaces/users/usecases/create.user.service.usecase';

@Injectable()
export class CreateUserService implements ICreateUserUseCase {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(UserMailAddress)
    private userMailAddressRepository: Repository<UserMailAddress>,
    @InjectConnection()
    private connection: Connection,
  ) {}

  /**
   * ユーザーを作成します
   * @param user - ユーザーエンティティ
   * @returns 登録したユーザー
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
