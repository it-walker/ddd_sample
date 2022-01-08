export class DeleteProductCommand {
  constructor(props: DeleteProductCommand) {
    this.productId = props.productId;
  }

  readonly productId: string;
}
