import { typeormConfig } from './ormconfig';

const database = {
  ...typeormConfig,
  entities: ['dist/**/*.orm-entity.js'],
  migrationsTableName: 'migrations',
  migrations: ['dist/**/migrations/*.js'],
  seeds: ['dist/**/seeding/**/*.seeder.js'],
  factories: ['dist/**/factories/**/*.js'],
  cli: {
    migrationsDir: 'src/infrastructure/database/migrations',
  },
};

export = database;
