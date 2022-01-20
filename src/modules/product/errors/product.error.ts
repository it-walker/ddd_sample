import { ExceptionBase } from '@src/libs/exceptions'

/**
 * ProductAlreadyExistsError class
 */
export class ProductAlreadyExistsError extends ExceptionBase {
  static readonly message: 'Product already exists';

  public readonly code = 'PRODUCT.ALREADY_EXISTS';

  /**
   *
   * @param {unknown} metadata
   */
  constructor(metadata?: unknown) {
    super(ProductAlreadyExistsError.message, metadata)
  }
}
