import { Command } from 'commander';
import chalk from 'chalk';
import axios from 'axios';
import { TSVFileWriter, TSVOfferGenerator } from '../../shared/libs/index.js';

const program = new Command();

const generateCommand = program
  .createCommand('generate')
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

export { generateCommand };
