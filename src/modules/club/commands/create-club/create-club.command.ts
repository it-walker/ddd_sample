import {
  Command,
  CommandProps,
} from '@libs/ddd/domain/base-classes/command.base'

export class CreateClubCommand extends Command {
  /**
   * @param {CommandProps<CreateClubCommand>} props
   */
  constructor(props: CommandProps<CreateClubCommand>) {
    super(props)
    this.name = props.name
    this.memberIds = props.memberIds
  }

  readonly name: string;
  readonly memberIds: string[];
}
