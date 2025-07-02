"use strict";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { globby } from "globby";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("process argv.....", process.argv);
const argv = yargs(hideBin(process.argv)).scriptName("templater").usage("$0 <args>").help().argv;
console.log("argvvvvv", argv);
const exampleFilePaths = await globby(path.join(__dirname, "..", "example", "*"));
const exampleFiles = await Promise.all(exampleFilePaths.map((filepath) => {
  return fs.readFile(filepath);
}));
const srcFiles = await Promise.all(
  (await globby(path.join(__dirname, "..", "src", "*"))).map((filepath) => {
    return fs.readFile(filepath);
  })
);
const testFiles = await fs.readFile(path.join(__dirname, "..", "test", "index.ts"));
