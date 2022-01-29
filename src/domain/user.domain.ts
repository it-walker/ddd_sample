import { IsArray, IsString } from 'class-validator'

import { UserMailAddressDomain } from '@src/domain/user.mailAddress.domain'

/**
 * UserDomain class
 */
export class UserDomain {
  @IsString()
  readonly name: string;

  @IsArray()
  readonly mailAddresses: UserMailAddressDomain[];
}
