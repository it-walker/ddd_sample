import { Logger, Provider } from '@nestjs/common'

export const createClubCliLoggerSymbol = Symbol('createClubCliLoggerSymbol')

export const createClubCliLoggerProvider: Provider = {
  provide: createClubCliLoggerSymbol,
  useFactory: (): Logger => {
    return new Logger('create-club-cli')
  },
}
