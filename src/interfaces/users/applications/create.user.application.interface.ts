import { UserDomain } from '../../../domain/user.domain';

export interface ICreateUserApplication {
  create(userDomain: UserDomain): Promise<UserDomain>;
}
