import {
  Command,
  CommandProps,
} from '@src/libs/ddd/domain/base-classes/command.base'

/**
 * CreateProductCommand class
 */
export class CreateProductCommand extends Command {
  /**
   * constructor
   * @param {CommandProps<CreateProductCommand>} props
   */
  constructor(props: CommandProps<CreateProductCommand>) {
    super(props)
    this.name = props.name
    this.description = props.description
    this.price = props.price
  }

  readonly name: string;
  readonly description: string;
  readonly price: number;
}
