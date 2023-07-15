/* eslint-disable no-console */
import fs, { readdirSync } from "fs";
import path from "path";
import chalk from "chalk";

export const paths = {
  releaseNotes: path.join(__dirname, "../src", "releaseNotes"),
};

export function getFiles(filepath: string) {
  return fs.readdirSync(filepath).filter(function (file) {
    return fs.statSync(path.join(filepath, file)).isFile();
  });
}

export function writeFile(
  filepath: string,
  content: string,
  successMessage: string
) {
  fs.writeFile(filepath, content, function (err) {
    err
      ? console.log(chalk.red(err))
      : console.log(chalk.green(successMessage));
  });
}

export function readFile(filePath: string) {
  return fs.readFileSync(filePath, "utf-8");
}

export function fileExists(filePath: string) {
  return fs.existsSync(filePath);
}

export function getDirectories(source) {
  return readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}
