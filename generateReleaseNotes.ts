// Generates a single array of release notes
// 1. Read all the files under /releaseNotes, and generate a single array
// 2. The generated array is read by releaseNotes.tsx
import path from "path";
import { writeFile, getDirectories, getFiles, readFile } from "./file-utils";

const releaseNotesFolderPath = path.join(__dirname, "release-notes");
const releaseNoteDirectories = getDirectories(releaseNotesFolderPath);
const writePath = path.join(__dirname, "release-notes.ts");
let numFilesToProcess = 0;
let fileContent = "";

// Release notes only allow this small subset of imports.
// This way we know what imports to add as globals in the concatenated file.
// If we need to support more, add them here.
const allowedImports = [];

// Strip the repeated boilerplate from each release notes file as we create one unified file.
// If a release notes file needs to import something not listed here, add it to the allowedImports array above.
const contentToStripFromEachReleaseNoteFile = [
  'import { ReleaseNote } from "../release-notes.types";',
  "export const note: ReleaseNote = ",
  ...allowedImports,
];

// The header includes imports for components we typically use in release notes.
// If you need to use other components in release notes, add the import here.
const header = `THIS FILE IS GENERATED. DO NOT EDIT.
import { Release } from "../../../releaseNotes/releaseNotes.types";
${allowedImports.join("\n")}

export const releases: Release[] = [`;

function sortDescending(a: string, b: string) {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
}

// First, determine the number of files we need to process.
// This information is necessary so we know when we're done, and can write the final file.
releaseNoteDirectories.sort(sortDescending).forEach((dirname) => {
  const dirFilePath = path.join(releaseNotesFolderPath, dirname);
  numFilesToProcess += getFiles(dirFilePath).length;
});
releaseNoteDirectories.forEach((dirname) => {
  const dirFilePath = path.join(releaseNotesFolderPath, dirname);
  const files = getFiles(dirFilePath);
  fileContent += `{
    tag: "${dirname}",
    changes: [
  `;
  files.forEach(async (filename, index) => {
    const filepath = path.join(dirFilePath, filename);
    // Add comma at end of each release note since we're gluing them together into a single array.
    let rawFileContent = readFile(filepath).replace("};", "},");

    contentToStripFromEachReleaseNoteFile.forEach(
      (c) => (rawFileContent = rawFileContent.replace(c, ""))
    );

    fileContent += rawFileContent;
    const isLastFileInDir = index === files.length - 1;
    if (isLastFileInDir) fileContent += "]},";
    numFilesToProcess--;
    if (numFilesToProcess === 0) {
      writeFile(
        writePath,
        header + fileContent + "];", // Close the array of releaseNotes
        "Generated release notes data."
      );
    }
  });
});
