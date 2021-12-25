import { UserDomain } from '../../../domain/user.domain';

export interface ICreateUserService {
  create(userDomain: UserDomain): Promise<UserDomain>;
}
