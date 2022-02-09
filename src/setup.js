import dotenv from 'dotenv';

let envFile = '.env.dev';

if (process.env.NODE_ENV === 'prod') envFile = '.env';

dotenv.config({
  path: envFile,
});
