import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { UserDomain } from '@/domain/user.domain';
import { TYPES } from '@/interfaces/types';
import { IGetUserApplication } from '@/interfaces/users/applications/get.user.application.interface';
import { IGetUserUseCase } from '@/interfaces/users/usecases/get.user.service.usecase';

@Injectable()
export class GetUserApplication implements IGetUserApplication {
  constructor(
    @Inject(TYPES.services.IGetUserService)
    private getUserService: IGetUserUseCase,
  ) {}

  async getById(id: string): Promise<UserDomain> {
    const user = await this.getUserService.getById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} was not found`);
    }
    return user;
  }
}
