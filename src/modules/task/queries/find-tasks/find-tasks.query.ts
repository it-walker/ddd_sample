import { Query } from '@libs/ddd/domain/base-classes/query-handler.base'
import { TaskStatus } from '@src/modules/task/domain/entities/task.type'

/**
 * Query is a plain object with properties
 */
export class FindTasksQuery extends Query {
  /**
   * constructor
   * @param {FindTasksQuery} props
   */
  constructor(props: FindTasksQuery) {
    super()
    this.name = props.name
    this.dueDate = props.dueDate
    this.postponeCoune = props.postponeCoune
    this.status = props.status
  }

  readonly name?: string;
  readonly dueDate?: Date;
  readonly postponeCoune?: number;
  readonly status?: TaskStatus;
}
