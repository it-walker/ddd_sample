import { ExceptionBase } from '@libs/exceptions'

export class ClubMemberNotEnoughBalanceError extends ExceptionBase {
  static readonly message: 'Wallet has not enough balance';

  public readonly code = 'WALLET.NOT_ENOUGH_BALANCE';

  /**
   * constructor
   * @param {unknown} metadata
   */
  constructor(metadata?: unknown) {
    super(ClubMemberNotEnoughBalanceError.message, metadata)
  }
}
