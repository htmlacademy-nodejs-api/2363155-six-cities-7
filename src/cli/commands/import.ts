import { Command } from 'commander';
import chalk from 'chalk';
import { ConfigSchema, TSVFileReader } from '../../shared/libs/index.js';
import { Offer } from '../../shared/models/offer.interface.js';
import { DefaultUserService } from '../../shared/modules/user/default-user.service.js';
import { UserModel } from '../../shared/modules/user/user.entity.js';
import { DefaultOfferService } from '../../shared/modules/offer/offer.service.js';
import { OfferModel } from '../../shared/modules/offer/offer.entity.js';
import { getEnv } from '../../shared/utils/env.js';
import { configureApp } from '../application/index.js';

const program = new Command();

const importCommand = program
  .createCommand('import')
  .argument('<pathname>', 'Path to the .tsv file')
  .description('Reads .tsv file and converts it into javascript objects')
  .action(async (pathname) => {
    try {
      const env = getEnv<ConfigSchema>();
      const app = await configureApp();
      const reader = new TSVFileReader(pathname);
      const userService = new DefaultUserService(console, UserModel);
      const offerService = new DefaultOfferService(console, OfferModel);

      const saveOffer = async (offer: Offer) => {
        console.log(chalk.green(JSON.stringify(offer)));
        const user = await userService.findOrCreate(
          offer.author as Required<Offer['author']>,
          env.SALT,
        );

        await offerService.create(offer, user.id);
      };

      const promises: Promise<void>[] = [];
      reader.on('line', (offer: Offer) => {
        promises.push(saveOffer(offer));
      });
      reader.on('end', async (linesCount) => {
        console.log(
          chalk.bold(`Reading successful, total lines read: ${linesCount}`),
        );
        await Promise.all(promises);
        await app.close();
        console.log(
          chalk.green(
            `Import successful, ${promises.length} offers saved to database!`,
          ),
        );
      });

      reader.read();
    } catch (err) {
      console.log(chalk.red(`Error reading file: ${err}`));
      throw err;
    }
  });

export { importCommand };
