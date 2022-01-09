import { IsArray, IsString } from 'class-validator';

import { UserMailAddressDomain } from './user.mailAddress.domain';

/**
 * UserDomain class
 */
export class UserDomain {
  @IsString()
  readonly name: string;

  @IsArray()
  readonly mailAddresses: UserMailAddressDomain[];
}
