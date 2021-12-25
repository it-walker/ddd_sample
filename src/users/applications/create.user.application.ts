import { Inject, Injectable } from '@nestjs/common';

import { UserDomain } from '../../domain/user.domain';
import { ICreateUserApplication } from '../../interfaces/users/applications/create.user.application.interface';
import { ICreateUserService } from '../../interfaces/users/services/create.user.service.interface';
import { TYPES } from '../../interfaces/types';

@Injectable()
export class CreateUserApplication implements ICreateUserApplication {
  constructor(
    @Inject(TYPES.services.ICreateUserService)
    private userService: ICreateUserService,
  ) {}

  async create(user: UserDomain): Promise<UserDomain> {
    return this.userService.create(user);
  }
}
