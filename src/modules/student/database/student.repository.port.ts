import { RepositoryPort } from '@libs/ddd/domain/ports/repository.ports'
import {
  StudentEntity,
  StudentProps,
} from '@modules/student/domain/entities/student.entity'

/* Repository port belongs to application's core, but since it usually
 changes together with repository it is kept in the same directory for
 convenience. */
export interface StudentRepositoryPort
  extends RepositoryPort<StudentEntity, StudentProps> {
  findOneByIdOrThrow(id: string): Promise<StudentEntity>;
  exists(name: string): Promise<boolean>;
}
