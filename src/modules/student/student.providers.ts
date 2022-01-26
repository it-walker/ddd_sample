import { Logger, Provider } from '@nestjs/common'

export const createStudentCliLoggerSymbol = Symbol(
  'createStudentCliLoggerSymbol',
)

export const createStudentCliLoggerProvider: Provider = {
  provide: createStudentCliLoggerSymbol,
  useFactory: (): Logger => {
    return new Logger('create-student-cli')
  },
}
