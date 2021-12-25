import { MailAddress } from './mailAddress';

/**
 * userIdを識別子とするエンティティ
 */
export class User {
  private userId: string;
  private name: string;
  private mailAddress: Array<MailAddress>;
}
