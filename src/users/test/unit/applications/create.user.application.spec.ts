import { Test } from '@nestjs/testing';

import { UserDomain } from '@/domain/user.domain';
import { TYPES } from '@/interfaces/types';
import { CreateUserApplication } from '@/users/applications/create.user.application';

/**
 * CreateUserService class
 */
class CreateUserService {
  /**
   *
   * @param {any} user
   * @return {any}
   */
  create(user) {
    return user;
  }
}
describe('CreateUserApplication', () => {
  let application: CreateUserApplication;
  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        CreateUserApplication,
        {
          provide: TYPES.services.ICreateUserService,
          useClass: CreateUserService,
        },
      ],
    }).compile();

    application = app.get<CreateUserApplication>(CreateUserApplication);
  });

  describe('create', () => {
    it('should create user', async () => {
      const user: UserDomain = {
        name: 'Rafael Pezzetti',
        mailAddresses: [{ value: 'rafael@pezzetti.com' }],
      };
      expect(await application.create(user)).toEqual(user);
    });
  });
});
