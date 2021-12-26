import { Inject, Injectable } from '@nestjs/common';

import { UserDomain } from '@/domain/user.domain';
import { TYPES } from '@/interfaces/types';
import { ICreateUserApplication } from '@/interfaces/users/applications/create.user.application.interface';
import { ICreateUserUseCase } from '@/interfaces/users/usecases/create.user.service.usecase';

@Injectable()
export class CreateUserApplication implements ICreateUserApplication {
  constructor(
    @Inject(TYPES.services.ICreateUserService)
    private userService: ICreateUserUseCase,
  ) {}

  async create(user: UserDomain): Promise<UserDomain> {
    return this.userService.create(user);
  }
}
