import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { UserDomain } from '../../domain/user.domain';
import { IGetUserApplication } from '../../interfaces/users/applications/get.user.application.interface';
import { IGetUserService } from '../../interfaces/users/services/get.user.service.interface';
import { TYPES } from '../../interfaces/types';

@Injectable()
export class GetUserApplication implements IGetUserApplication {
  constructor(
    @Inject(TYPES.services.IGetUserService)
    private getUserService: IGetUserService,
  ) {}

  async getById(id: string): Promise<UserDomain> {
    const user = await this.getUserService.getById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} was not found`);
    }
    return user;
  }
}
