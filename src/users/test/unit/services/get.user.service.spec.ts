import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../../../entities/user.entity';
import { UserMailAddress } from '../../../../entities/userMailAddress.entity';
import { GetUserService } from '../../../services/get.user.service';

describe('GetUserService', () => {
  let service: GetUserService;
  let repositoryMock: Repository<User>;
  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        GetUserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = app.get<GetUserService>(GetUserService);
    repositoryMock = app.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('findById', () => {
    it('should find user by id', async () => {
      const mail = new UserMailAddress();
      mail.value = 'rafael@pezzetti.com';
      const user = new User();
      user.name = 'Rafael Pezzetti';
      user.mailAddresses = [mail];
      jest.spyOn(repositoryMock, 'findOne').mockResolvedValueOnce(user);
      expect(await service.getById(user.id)).toEqual(user);
      expect(repositoryMock.findOne).toBeCalled();
    });
  });
});
