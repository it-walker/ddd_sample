import { Logger, Provider } from '@nestjs/common';

/* Constructing custom providers
 */
export const createTaskCliLoggerSymbol = Symbol('createTaskCliLoggerSymbol');

export const createTaskCliLoggerProvider: Provider = {
  provide: createTaskCliLoggerSymbol,
  useFactory: (): Logger => {
    return new Logger('create-task-cli');
  },
};
