"use strict";
import Handlebars from "handlebars";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { globby } from "globby";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const argv = yargs(hideBin(process.argv)).scriptName("templater").usage("$0 --package-name=@namespace/name --component-name=my-webcomponent").help().argv;
const { _, ...templateParams } = argv;
if (!templateParams["package-name"] || !templateParams["component-name"] || !templateParams["gh-namespace"] || !templateParams["repo-name"]) {
  throw new Error("Missing required params.");
}
const exampleFilePaths = await globby(path.resolve(__dirname, "..", "example", "*"));
const exampleFiles = await Promise.all(exampleFilePaths.map(async (filepath) => {
  return "" + await fs.readFile(filepath);
}));
exampleFiles.forEach(async (fileContent, i) => {
  const template = Handlebars.compile(fileContent);
  await fs.writeFile(exampleFilePaths[i], template(templateParams));
});
const srcFilePaths = await globby(path.resolve(__dirname, "..", "src", "*"));
const srcFiles = await Promise.all(
  srcFilePaths.map(async (filepath) => {
    return "" + await fs.readFile(filepath);
  })
);
srcFiles.forEach(async (fileContent, i) => {
  const template = Handlebars.compile(fileContent);
  await fs.writeFile(srcFilePaths[i], template(templateParams));
});
const testFilePath = path.resolve(__dirname, "..", "test", "index.ts");
const testFile = "" + await fs.readFile(testFilePath);
const testTemplate = Handlebars.compile(testFile);
await fs.writeFile(testFilePath, testTemplate(templateParams));
const packagePath = path.resolve(__dirname, "..", "package.json");
const _package = "" + await fs.readFile(packagePath);
const packageJsonTemplate = Handlebars.compile(_package);
const packageJson = packageJsonTemplate(templateParams);
const parsed = JSON.parse(packageJson);
delete parsed.scripts["build-cli"];
delete parsed.devDependencies.globby;
delete parsed.devDependencies.handlebars;
delete parsed.devDependencies.yargs;
await fs.writeFile(packagePath, JSON.stringify(parsed, null, 2));
const readmePath = path.resolve(__dirname, "..", "README.example.md");
const readmeTmpl = Handlebars.compile("" + await fs.readFile(readmePath));
const newReadme = readmeTmpl(templateParams);
await fs.writeFile(path.resolve(__dirname, "..", "README.md"), newReadme);
await fs.rm(path.resolve(__dirname, "..", "README.example.md"));
await fs.rm(path.resolve(path.resolve(__dirname)), {
  recursive: true,
  force: true
});
