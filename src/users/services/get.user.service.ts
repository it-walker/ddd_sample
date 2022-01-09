import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UserDomain} from '@src/domain/user.domain';
import {User} from '@src/entities/user.entity';
import {IGetUserUseCase} from '@src/interfaces/users/usecases/get.user.service.usecase';
import {Repository} from 'typeorm';

@Injectable()
export class GetUserService implements IGetUserUseCase {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getById(userId: string): Promise<UserDomain> {
    return this.usersRepository.findOne({id: userId});
  }
}
