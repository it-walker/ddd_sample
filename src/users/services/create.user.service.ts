import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserDomain } from '../../domain/user.domain';
import { User } from '../../entities/user.entity';
import { UserMailAddress } from '../../entities/userMailAddress.entity';
import { ICreateUserUseCase } from '../../interfaces/users/usecases/create.user.service.usecase';

@Injectable()
export class CreateUserService implements ICreateUserUseCase {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(UserMailAddress)
    private userMailAddressRepository: Repository<UserMailAddress>,
  ) {}

  /**
   * ユーザーを作成します
   * @param user - ユーザーエンティティ
   * @returns 登録したユーザー
   */
  async create(user: UserDomain): Promise<UserDomain> {
    for (const mail of user.mailAddresses) {
      await this.userMailAddressRepository.save(mail);
    }
    return await this.usersRepository.save(user);
  }
}
