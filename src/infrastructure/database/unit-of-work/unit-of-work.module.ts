import { Global, Logger, Module } from '@nestjs/common'
import { UnitOfWork } from '@src/infrastructure/database/unit-of-work/unit-of-work'

const unitOfWorkSingleton = new UnitOfWork(new Logger())

const unitOfWorkSingletonProvider = {
  provide: UnitOfWork,
  useFactory: () => unitOfWorkSingleton,
}

@Global()
@Module({
  imports: [],
  providers: [unitOfWorkSingletonProvider],
  exports: [UnitOfWork],
})
/**
 * UnitOfWorkModule class
 */
export class UnitOfWorkModule { }
