import { ExceptionBase } from '@src/libs/exceptions';

export class ProductAlreadyExistsError extends ExceptionBase {
  static readonly message: 'Product already exists';

  public readonly code = 'PRODUCT.ALREADY_EXISTS';

  constructor(metadata?: unknown) {
    super(ProductAlreadyExistsError.message, metadata);
  }
}
