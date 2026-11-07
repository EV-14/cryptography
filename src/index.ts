import yargs, { type Argv } from 'yargs';
import { hideBin } from 'yargs/helpers';
import process from 'node:process';
import { prng, type PRNG } from './prng/index.js';

const argv = yargs(hideBin(process.argv))
  .command({
    command: 'prng <type>',
    describe: 'Generar un número aleatorio',
    handler: (args) => {
      try {
        const result = prng(
          args.type as PRNG,
          args.size as number,
          args.min as number,
          args.max as number,
          args.encoding as BufferEncoding,
        );
        console.log(result);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error al generar el valor aleatorio:', error.message);
        }
        process.exit(1);
      }
    },
    builder: (yargsInstance: Argv) =>
      yargsInstance
        .positional('type', {
          choices: ['bytes', 'int', 'uuid'] as const,
          describe: 'Tipo de valor aleatorio',
        })
        .options({
          size: {
            alias: 's',
            type: 'number',
            description: 'Tamaño de la aleatoriedad',
            default: 16,
          },
          min: {
            type: 'number',
            default: 0,
          },
          max: {
            type: 'number',
            default: 100,
          },
          encoding: {
            alias: 'enc',
            choices: [
              'ascii',
              'utf8',
              'utf-8',
              'utf16le',
              'utf-16le',
              'ucs2',
              'ucs-2',
              'base64',
              'base64url',
              'latin1',
              'binary',
              'hex',
            ] as const,
            default: 'hex' as const,
          },
        }),
  })
  .demandCommand(1, 'You need at least one command before moving on')
  .help()
  .parseSync();
