import { Controller, Delete, Param } from '@nestjs/common'

import { DeleteClubCommand } from '@modules/club/commands/delete-club/delete-club.command'
import { DeleteClubService } from '@modules/club/commands/delete-club/delete-club.service'

import { routesV1 } from '@configs/app.routes'

@Controller(routesV1.version)
export class DeleteClubHttpController {
  /**
   * constructor
   * @param {DeleteClubService} service
   */
  constructor(private readonly service: DeleteClubService) { }

  @Delete(routesV1.club.delete)
  /**
   *
   */
  async deleteUser(@Param('id') id: string): Promise<void> {
    const command = new DeleteClubCommand({ clubId: id })
    await this.service.execute(command)
  }
}
