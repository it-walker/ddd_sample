import { registerAs } from '@nestjs/config'

const CONFIG_KEY_DATABASE = 'database'
export default registerAs(CONFIG_KEY_DATABASE, () => ({
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  entities: [],
  autoLoadEntities: true,
  logging: true,
}))
