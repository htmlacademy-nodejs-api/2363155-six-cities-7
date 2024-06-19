import dotenv from 'dotenv';
import path from 'node:path';
import { getCurrentModuleDirectoryPath } from './fs.js';

const DEFAULT_ENVIRONMENT = 'development';

const getEnv = <T extends object>() => {
  const mode = process.env.NODE_ENV || DEFAULT_ENVIRONMENT;
  const { parsed } = dotenv.config({
    path: path.resolve(getCurrentModuleDirectoryPath(), `../../.env.${mode}`),
  });

  if (!parsed) {
    throw new Error('Environment variables not found');
  }

  return parsed as T;
};

export { getEnv, DEFAULT_ENVIRONMENT };
