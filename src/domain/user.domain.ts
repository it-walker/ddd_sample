import {IsArray, IsString} from 'class-validator';

import {UserMailAddressDomain} from './user.mailAddress.domain';

export class UserDomain {
  @IsString()
  readonly name: string;

  @IsArray()
  readonly mailAddresses: UserMailAddressDomain[];
}
