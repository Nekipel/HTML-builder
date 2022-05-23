const fs = require('fs');
const path = require('path');
const stylesFolder = path.join(__dirname, 'styles');

async function createBund(pathToFolderDev) {

  const files = await fs.promises.readdir(pathToFolderDev, {
    withFileTypes: true,
  });

  const content = fs.createWriteStream(
    path.join(__dirname, "project-dist", "bundle.css"),
    "utf-8"
  );
  
  files.forEach((file) => {
    let pathToFile = path.join(pathToFolderDev, file.name);
    if (file.isFile() && path.extname(file.name) === ".css") {
      const arr = [];
      const readFiles = fs.createReadStream(pathToFile, "utf-8");
      readFiles.on("data", (chunk) => arr.push(chunk));
      readFiles.on("end", () => arr.forEach((x) => content.write(x + "\n")));
      readFiles.on("error", (err) => console.log("Error: ", err.message));
    }
  });
}

createBund(stylesFolder);