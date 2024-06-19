type GetMongoURIOptions = {
  username: string;
  password: string;
  host: string;
  port: number;
  dbName: string;
  authSource?: string;
};

function getMongoURI({
  username,
  password,
  host,
  port,
  dbName,
  authSource = 'admin',
}: GetMongoURIOptions): string {
  return `mongodb://${username}:${password}@${host}:${port}/${dbName}?authSource=${authSource}`;
}

export { getMongoURI };
