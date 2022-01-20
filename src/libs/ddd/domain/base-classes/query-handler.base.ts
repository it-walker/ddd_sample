import { Result } from '@libs/ddd/domain/utils/result.util'

/**
 * Query class
 */
export abstract class Query { }

/**
 * QueryHandlerBase class
 */
export abstract class QueryHandlerBase {
  /**
   * For consistency with a CommandHandlerBase and DomainEventHandler
   * @param {Query} query
   * @return {Promise<Result<unknown>>}
   */
  abstract handle(query: Query): Promise<Result<unknown>>;

  /**
   *
   * @param {Query} query
   * @return {Promise<Result<unknown>>}
   */
  execute(query: Query): Promise<Result<unknown>> {
    return this.handle(query)
  }
}
