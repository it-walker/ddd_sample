import { Query } from '@libs/ddd/domain/base-classes/query-handler.base'

/**
 * FindProductsQuery class
 */
export class FindProductsQuery extends Query {
  /**
   *
   * @param {FindProductsQuery} props
   */
  constructor(props: FindProductsQuery) {
    super()
    this.name = props.name
  }

  readonly name?: string;
}
