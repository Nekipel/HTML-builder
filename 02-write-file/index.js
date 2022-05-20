const { stdin, stdout, exit} = process;
const fs = require('fs');
const path = require('path');

const appendFileIn = (answer) => {
  fs.writeFile("text.txt", "Hello мир!", function (error) {
    if (error) throw error;
  });
  fs.appendFile(path.join(__dirname, "text.txt"), ` ${answer}`, (err) => {
    if (err) throw err;
    console.log("Файл был изменен");
  });
};
process.on("exit", () => stdout.write("Удачи в изучении Node.js!\n"));
stdout.write("Пожалуйста введите текст:\n");

stdin.on("data", (data) => {
  let answer = data.toString();
  if (data.toString().trim()  === "exit") {
    process.exit();
    } else {
    appendFileIn(answer);
    }
});

process.on('SIGINT', exit);

