import {registerAs} from '@nestjs/config';

const CONFIG_KEY_APP = 'app';
export default registerAs(CONFIG_KEY_APP, () => ({
  env: process.env.APP_ENV,
  name: process.env.APP_NAME,
  url: process.env.APP_URL,
  port: process.env.APP_PORT,
}));
