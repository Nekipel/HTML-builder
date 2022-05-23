const path = require('path');
const { readdir, copyFile, rm, mkdir } = require('fs/promises');

const dirOriginal = path.join(__dirname, 'files');
const dirCopyCatalog = path.join(__dirname, 'files-copy');

async function copyDir(dir, dirCopy) {
  const dirFiles = await readdir(dir, { withFileTypes: true });
  dirFiles.forEach(async function (element) {
    if (element.isFile()) {
      copyFile(path.join(dir, element.name), path.join(dirCopy, element.name));
    } else if (element.isDirectory()) {
      await mkdir(dirCopy + "\\" + element.name);
      await copyDir(dir + "\\" + element.name, dirCopy + "\\" + element.name);
    }
  });
}

(async function () {
  await rm(dirCopyCatalog, { recursive: true, force: true });
  await mkdir(dirCopyCatalog);
  await copyDir(dirOriginal, dirCopyCatalog);
})();
