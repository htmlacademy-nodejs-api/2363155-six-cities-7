#!/usr/bin/env node

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import { Command } from 'commander';
import chalk from 'chalk';
import { TSVFileReader, TSVOfferGenerator } from '../shared/index.js';
import axios from 'axios';
import { TSVFileWriter } from '../shared/file-writer/index.js';

const filePath = dirname(fileURLToPath(import.meta.url));
const packageUrl = path.resolve(filePath, '../../package.json');
const packageJsonContent = JSON.parse(await readFile(packageUrl, 'utf-8'));

const program = new Command();

program
  .name('node-tsv-parser')
  .description('Parse .tsv files with node')
  .version(packageJsonContent.version, '-v, --version');

program
  .command('import')
  .argument('<pathname>', 'Path to the .tsv file')
  .description('Reads .tsv file and converts it into javascript objects')
  .action((pathname) => {
    try {
      const reader = new TSVFileReader(pathname);

      reader.on('line', (offer) => {
        console.log(chalk.green(JSON.stringify(offer)));
      });
      reader.on('end', (linesCount) => {
        console.log(
          chalk.bold(`Reading successful, total lines read: ${linesCount}`),
        );
      });

      reader.read();
    } catch (err) {
      console.log(chalk.red(`Error reading file: ${err}`));
      throw err;
    }
  });

program
  .command('generate')
  .argument('<amount>', 'Amount of offers to generate')
  .argument('<pathname>', 'Path to write the .tsv file')
  .argument('<url>', 'URL to fetch data')
  .description('Generates random offer data and writes into TSV file')
  .action(async (amount, pathname, url) => {
    try {
      const { data } = await axios.get(url);
      const generator = new TSVOfferGenerator(data);
      const writer = new TSVFileWriter(pathname);

      let offersAmount = Number(amount);
      while (offersAmount > 0) {
        await writer.write(generator.generate());
        offersAmount--;
      }
      console.log(chalk.green('Generation successful'));
    } catch (err) {
      console.log(chalk.red(`Error writing file: ${err}`));
      throw err;
    }
  });

program.parse(process.argv);
