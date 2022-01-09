import { routesV1 } from '@config/app.routes';
import { Controller, Delete, Param } from '@nestjs/common';

import { DeleteUserCommand } from './delete-user.command';
import { DeleteUserService } from './delete-user.service';

@Controller(routesV1.version)
/**
 * DeleteUserHttpController class
 */
export class DeleteUserHttpController {
  /**
   * constructor
   * @param {DeleteUserService} service
   */
  constructor(private readonly service: DeleteUserService) {}

  @Delete(routesV1.user.delete)
  /**
   *
   */
  async deleteUser(@Param('id') id: string): Promise<void> {
    const command = new DeleteUserCommand({ userId: id });
    await this.service.execute(command);
  }
}
