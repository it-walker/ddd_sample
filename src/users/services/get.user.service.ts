import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserDomain } from '../../domain/user.domain';
import { User } from '../../entities/user.entity';
import { IGetUserUseCase } from '../../interfaces/users/usecases/get.user.service.usecase';

@Injectable()
export class GetUserService implements IGetUserUseCase {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getById(userId: string): Promise<UserDomain> {
    return this.usersRepository.findOne({ id: userId });
  }
}
