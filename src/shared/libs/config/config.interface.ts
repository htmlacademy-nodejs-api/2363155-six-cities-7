interface Config<Schema> {
  get<T extends keyof Schema = keyof Schema>(key: T): Schema[T];
}

export type { Config };
