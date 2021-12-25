import { IsEmail } from 'class-validator';

/**
 * 値オブジェクト
 */
export class UserMailAddressDomain {
  @IsEmail()
  value: string;
}
