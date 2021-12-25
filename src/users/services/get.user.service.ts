import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserDomain } from '../../domain/user.domain';
import { User } from '../../entities/user.entity';
// import { UserDomain } from '../domain/user.domain';
// import { User } from '../domain/user.entity';
import { IGetUserService } from '../../interfaces/users/services/get.user.service.interface';

@Injectable()
export class GetUserService implements IGetUserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<UserDomain>,
  ) {}

  async getById(id: string): Promise<UserDomain> {
    return this.usersRepository.findOne({ userId: id });
  }
}
