// import { MailAddress } from './mailAddress';

// /**
//  * userIdを識別子とするエンティティ
//  */
// export class User {
//   private userId: string;
//   private name: string;
//   private mailAddress: Array<MailAddress>;
// }

import { IsArray, IsString } from 'class-validator';

import { UserMailAddressDomain } from './user.mailAddress.domain';

export class UserDomain {
  @IsString()
  readonly name: string;

  // @IsString({ each: true })
  @IsArray()
  readonly mailAddresses: UserMailAddressDomain[];
}
