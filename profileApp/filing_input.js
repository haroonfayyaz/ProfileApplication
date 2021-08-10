const fs = require("fs");
const { stdin: input, stdout: output } = process;
const { createInterface } = require("readline");

const readDataFromFile = async (fileName) => {
  return new Promise((resolve) => {
    fs.readFile(fileName, (err, data) => {
      if (err) resolve(false);
      resolve(data);
    });
  });
};

const writeDataToFile = (fileName, data) => {
  fs.writeFile(fileName, data, (err) => {
    if (err) throw err;
  });
};

const takeInput = (prompt) => {
  const rl = createInterface({ input, output });
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
      rl.close();
    });
  });
};

module.exports = { readDataFromFile, writeDataToFile, takeInput };
