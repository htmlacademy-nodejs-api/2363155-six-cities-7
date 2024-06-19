#!/usr/bin/env node
import 'reflect-metadata';
import { readFile } from 'node:fs/promises';
import { Command } from 'commander';
import { getPackageJsonPath } from '../shared/utils/index.js';
import { importCommand, generateCommand } from './commands/index.js';

const packageUrl = getPackageJsonPath();
const packageJsonContent = JSON.parse(await readFile(packageUrl, 'utf-8'));

const program = new Command();

program
  .name('node-tsv-parser')
  .description('Parse .tsv files with node')
  .version(packageJsonContent.version, '-v, --version');

program.addCommand(importCommand);
program.addCommand(generateCommand);

program.parse(process.argv);
