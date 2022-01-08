import { Logger, Provider } from '@nestjs/common';

export const createProductCliLoggerSymbol = Symbol(
  'createProductCliLoggerSymbol',
);

export const createProductCliLoggerProvider: Provider = {
  provide: createProductCliLoggerSymbol,
  useFactory: (): Logger => {
    return new Logger('create-product-cli');
  },
};
