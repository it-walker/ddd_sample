import { userSeeds } from '@modules/user/database/seeding/user.seeds'
import { UserOrmEntity } from '@modules/user/database/user.orm-entity'
import { Factory, Seeder } from 'typeorm-seeding'

/**
 * CreateUsers class
 */
export default class CreateUsers implements Seeder {
  /**
   *
   * @param {Factory} factory
   */
  public async run(factory: Factory): Promise<void> {
    await Promise.all(
      userSeeds.map((seed) => factory(UserOrmEntity)().create(seed)),
    )
  }
}
