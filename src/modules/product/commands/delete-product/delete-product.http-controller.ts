import { Controller, Delete, Param } from '@nestjs/common'

import { DeleteProductCommand } from '@modules/product/commands/delete-product/delete-product.commands'
import { DeleteProductService } from '@modules/product/commands/delete-product/delete-product.service'

import { routesV1 } from '@configs/app.routes'

@Controller(routesV1.version)
/**
 * DeleteProductHttpController
 */
export class DeleteProductHttpController {
  /**
   * constructor
   * @param {DeleteProductService} service
   */
  constructor(private readonly service: DeleteProductService) { }

  @Delete(routesV1.product.delete)
  /**
   * @param {string} id
   */
  async deleteProduct(@Param('id') id: string): Promise<void> {
    const command = new DeleteProductCommand({ productId: id })
    await this.service.execute(command)
  }
}
