/**
 *
 * @param {T} target - Prevents other classes extending a class marked by this decorator.
 * @return {T}
 */
export function final<T extends { new (...args: any[]): object }>(
  target: T,
): T {
  return class Final extends target {
    /**
     * コンストラクタ
     * @param {any} args
     */
    constructor(...args: any[]) {
      if (new.target !== Final) {
        throw new Error(`Cannot extend a final class "${target.name}"`)
      }
      super(...args)
    }
  }
}
