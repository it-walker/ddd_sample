import { UserDomain } from '@src/domain/user.domain';

export interface ICreateUserApplication {
  create(userDomain: UserDomain): Promise<UserDomain>;
}
