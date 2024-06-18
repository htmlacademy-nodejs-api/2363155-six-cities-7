import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const getCurrentModuleDirectoryPath = () => {
  const filepath = fileURLToPath(import.meta.url);
  return dirname(filepath);
};

export { getCurrentModuleDirectoryPath };
