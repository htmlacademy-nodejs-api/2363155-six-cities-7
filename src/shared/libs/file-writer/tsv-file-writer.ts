import { WriteStream, createWriteStream } from 'node:fs';
import { FileWriter } from './file-writer.interface.js';

export class TSVFileWriter implements FileWriter {
  private stream: WriteStream;

  constructor(private readonly filename: string) {
    this.stream = createWriteStream(this.filename, {
      flags: 'w',
      encoding: 'utf-8',
      autoClose: true,
    });
  }

  public async write(content: string): Promise<void> {
    const writeSuccess = this.stream.write(`${content}\n`);
    if (!writeSuccess) {
      return new Promise((resolve) => {
        this.stream.once('drain', resolve);
      });
    }

    return Promise.resolve();
  }
}
