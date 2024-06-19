interface DBClient {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}

export type { DBClient };
