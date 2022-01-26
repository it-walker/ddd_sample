import { typeormConfig } from '@configs/ormconfig'

const database = {
  ...typeormConfig,
  entities: ['src/**/*.orm-entity.ts'],
  migrationsTableName: 'migrations',
  migrations: ['src/**/migrations/*.ts'],
  seeds: ['src/**/seeding/**/*.seeder.ts'],
  factories: ['dist/**/factories/**/*.js'],
  cli: {
    migrationsDir: 'src/infrastructure/database/migrations',
  },
}

export = database;
