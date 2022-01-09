import { Factory, Seeder } from 'typeorm-seeding';

import { UserOrmEntity } from '../user.orm-entity';
import { userSeeds } from './user.seeds';

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
    );
  }
}
