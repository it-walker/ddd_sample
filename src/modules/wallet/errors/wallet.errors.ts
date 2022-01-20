import { ExceptionBase } from '@src/libs/exceptions'

/**
 * WalletNotEnoughBalanceError class
 */
export class WalletNotEnoughBalanceError extends ExceptionBase {
  static readonly message: 'Wallet has not enough balance';

  public readonly code = 'WALLET.NOT_ENOUGH_BALANCE';

  /**
   * constructor
   * @param {unknown} metadata
   */
  constructor(metadata?: unknown) {
    super(WalletNotEnoughBalanceError.message, metadata)
  }
}
