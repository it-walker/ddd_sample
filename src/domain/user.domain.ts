import { UserMailAddressDomain } from '@src/domain/user.mailAddress.domain'
import { IsArray, IsString } from 'class-validator'

/**
 * UserDomain class
 */
export class UserDomain {
  @IsString()
  readonly name: string;

  @IsArray()
  readonly mailAddresses: UserMailAddressDomain[];
}
