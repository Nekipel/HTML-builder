const fs = require('fs');
const path = require('path');
const { stat } = require('fs');

const folder = path.join(__dirname, 'secret-folder');

fs.readdir(folder, { withFileTypes: true }, (err, files) => {
  if (err) console.log(err);
  else {
    files
      .filter((x) => x.isFile())
      .forEach((file) => {
        const fileName = path.join(folder, file.name);
        const fileObject = path.parse(fileName);
        stat(fileName, (err, stats) => {
          console.log(
            fileObject.name +
              "  " +
              fileObject.ext.slice(1) +
              "  " +
              stats.size +
              " bytes"
          );
        });
      });
  }
});


