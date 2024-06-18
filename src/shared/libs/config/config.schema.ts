import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

interface ConfigSchema {
  PORT: number;
  DB_HOST: string;
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
  SALT: {
    doc: 'Salt for password hash',
    format: String,
    default: null,
    env: 'SALT',
  },
});

export { configSchema };
export type { ConfigSchema };
