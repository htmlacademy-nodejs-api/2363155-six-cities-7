import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';

const getCurrentModuleDirectoryPath = () => {
  const filepath = fileURLToPath(import.meta.url);
  return dirname(filepath);
};

const getPackageJsonPath = () =>
  path.resolve(getCurrentModuleDirectoryPath(), '../../package.json');

export { getCurrentModuleDirectoryPath, getPackageJsonPath };
