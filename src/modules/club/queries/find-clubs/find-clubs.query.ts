import { Query } from '@libs/ddd/domain/base-classes/query-handler.base'

/**
 * Query is a plain object with properties
 */
export class FindClubsQuery extends Query {
  /**
   * constructor
   * @param {FindClubsQuery} props
   */
  constructor(props: FindClubsQuery) {
    super()
    this.name = props.name
    this.isApproval = props.isApproval
  }

  readonly name?: string;

  readonly isApproval?: boolean;

}
