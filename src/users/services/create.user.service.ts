import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserDomain } from '../../domain/user.domain';
import { User } from '../../entities/user.entity';
// import { User } from '../domain/user.entity';
import { ICreateUserService } from '../../interfaces/users/services/create.user.service.interface';

@Injectable()
export class CreateUserService implements ICreateUserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(user: UserDomain): Promise<UserDomain> {
    return this.usersRepository.save(user);
  }
}
