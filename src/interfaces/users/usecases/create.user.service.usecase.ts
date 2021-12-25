import { UserDomain } from '../../../domain/user.domain';

export interface ICreateUserUseCase {
  create(userDomain: UserDomain): Promise<UserDomain>;
}
