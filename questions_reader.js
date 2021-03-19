const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('csvFiles/questions.csv'),
  output: fs.createWriteStream('cleanFiles/questions_clean.csv'),
  crflDelay: Infinity
})

rl.flaggedFiles =  fs.createWriteStream('./flaggedFiles/questions_flagged.csv');


let count = 0;

rl.on('line', (line) => {
  //transform
  //turn line into array of each column as an index
  var columns = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
  if (columns.length !== 8) {
    rl.flaggedFiles.write(`${line}\n`);
    return
  }

  if (isNaN(Number(columns[0]))) {
    rl.flaggedFiles.write(`${line}\n`);
    return};
  if (isNaN(Number(columns[1]))) {
    rl.flaggedFiles.write(`${line}\n`);
    return};
  if (columns[2].length < 5 || columns[2].length > 1000) {
    rl.flaggedFiles.write(`${line}\n`);
    return};
  if (columns[3].length === 10) {
    rl.flaggedFiles.write(`${line}\n`);
    return};
  if (columns[4].length > 100) {
    rl.flaggedFiles.write(`${line}\n`);
    return};
  if (columns[5].indexOf('@') === -1) {
    rl.flaggedFiles.write(`${line}\n`);
    return};
  if (Number(columns[6]) !== 0 && Number(columns[6]) !== 1) {
    rl.flaggedFiles.write(`${line}\n`);
    return};
  if (isNaN(Number(columns[7]))) {
    rl.flaggedFiles.write(`${line}\n`);
    return};

  rl.output.write(`${line}\n`);
  count++;

})
.on('close', () => {
  console.log(count)
})