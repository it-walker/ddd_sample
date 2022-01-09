import {Query} from '@libs/ddd/domain/base-classes/query-handler.base';

export class FindProductsQuery extends Query {
  constructor(props: FindProductsQuery) {
    super();
    this.name = props.name;
  }

  readonly name?: string;
}
