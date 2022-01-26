import { Query } from '@libs/ddd/domain/base-classes/query-handler.base'

export class FindStudentsQuery extends Query {
  /**
   * constructor
   * @param {FindStudentsQuery} props
   */
  constructor(props: FindStudentsQuery) {
    super()
    this.name = props.name
  }

  readonly name?: string;
}
