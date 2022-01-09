/**
 * DeleteProductCommand class
 */
export class DeleteProductCommand {
  /**
   * constructor
   * @param {DeleteProductCommand} props
   */
  constructor(props: DeleteProductCommand) {
    this.productId = props.productId;
  }

  readonly productId: string;
}
