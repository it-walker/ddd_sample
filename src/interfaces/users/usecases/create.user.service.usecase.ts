import { UserDomain } from '@src/domain/user.domain';

export interface ICreateUserUseCase {
  create(userDomain: UserDomain): Promise<UserDomain>;
}
