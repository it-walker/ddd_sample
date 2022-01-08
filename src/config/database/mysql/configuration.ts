import { registerAs } from '@nestjs/config';

const CONFIG_KEY_DATABASE = 'database';
export default registerAs(CONFIG_KEY_DATABASE, () => ({
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  entities: ['dist/**/*.orm-entity.js'],
  migrationsTableName: 'migrations',
  migrations: ['dist/**/migrations/*.js'],
  subscribers: ['dist/**/subscribers/*.js'],
  seeds: ['dist/**/seeding/**/*.seeder.js'],
  factories: ['dist/**/factories/**/*.js'],
  cli: {
    entitiesDir: 'src/modules/*/database',
    migrationsDir: 'src/infrastructure/database/migrations',
    subscribersDir: 'src/modules/*/subscribers',
  },
}));
