import { routesV1 } from '@configs/app.routes'
import { DeleteUserCommand } from '@modules/user/commands/delete-user/delete-user.command'
import { DeleteUserService } from '@modules/user/commands/delete-user/delete-user.service'
import { Controller, Delete, Param } from '@nestjs/common'

@Controller(routesV1.version)
/**
 * DeleteUserHttpController class
 */
export class DeleteUserHttpController {
  /**
   * constructor
   * @param {DeleteUserService} service
   */
  constructor(private readonly service: DeleteUserService) { }

  @Delete(routesV1.user.delete)
  /**
   *
   */
  async deleteUser(@Param('id') id: string): Promise<void> {
    const command = new DeleteUserCommand({ userId: id })
    await this.service.execute(command)
  }
}
