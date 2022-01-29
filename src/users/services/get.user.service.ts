import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserDomain } from '@src/domain/user.domain'
import { User } from '@src/entities/user.entity'
import { IGetUserUseCase } from '@src/interfaces/users/usecases/get.user.service.usecase'

@Injectable()
/**
 * GetUserService class
 */
export class GetUserService implements IGetUserUseCase {
  /**
   * constructor
   * @param {Repository<User>} usersRepository
   */
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  /**
   *
   * @param {string} userId
   * @return {Promise<UserDomain>}
   */
  async getById(userId: string): Promise<UserDomain> {
    return this.usersRepository.findOne({ id: userId })
  }
}
