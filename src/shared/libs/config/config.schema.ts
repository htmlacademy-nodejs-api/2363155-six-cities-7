import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

interface ConfigSchema {
  PORT: number;
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_PORT: number;
  DB_NAME: string;
  SALT: string;
}

const configSchema = convict<ConfigSchema>({
  PORT: {
    doc: 'The port to bind',
    format: 'port',
    default: 3456,
    env: 'PORT',
  },
  DB_HOST: {
    doc: 'IP address of the database server (MongoDB)',
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'DB_HOST',
  },
  DB_USER: {
    doc: 'Database user',
    format: String,
    default: null,
    env: 'DB_USER',
  },
  DB_PASSWORD: {
    doc: 'Database password',
    format: String,
    default: null,
    env: 'DB_PASSWORD',
  },
  DB_PORT: {
    doc: 'Port to connect to database',
    format: 'port',
    default: 27017,
    env: 'DB_PORT',
  },
  DB_NAME: {
    doc: 'Database name (MongoDB)',
    format: String,
    default: 'six-cities-db',
    env: 'DB_NAME',
  },
  SALT: {
    doc: 'Salt for password hash',
    format: String,
    default: null,
    env: 'SALT',
  },
});

export { configSchema };
export type { ConfigSchema };
