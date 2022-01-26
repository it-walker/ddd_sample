import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { UserDomain } from '@src/domain/user.domain'
import { TYPES } from '@src/interfaces/types'
import { IGetUserApplication } from '@src/interfaces/users/applications/get.user.application.interface'
import { IGetUserUseCase } from '@src/interfaces/users/usecases/get.user.service.usecase'

@Injectable()
/**
 * GetUserApplication class
 */
export class GetUserApplication implements IGetUserApplication {
  /**
   * constructor
   * @param {IGetUserUseCase} getUserService
   */
  constructor(
    @Inject(TYPES.services.IGetUserService)
    private getUserService: IGetUserUseCase,
  ) {}

  /**
   *
   * @param {string} id
   * @return {Promise<UserDomain>}
   */
  async getById(id: string): Promise<UserDomain> {
    const user = await this.getUserService.getById(id)
    if (!user) {
      throw new NotFoundException(`User with id ${id} was not found`)
    }
    return user
  }
}
