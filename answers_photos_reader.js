const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('csvFiles/answers_photos.csv'),
  output: fs.createWriteStream('cleanFiles/answers_photos_clean.csv'),
  crflDelay: Infinity
})

rl.flaggedFiles =  fs.createWriteStream('./flaggedFiles/answers_photos_flagged.csv');

let count = 0;

rl.on('line', (line) => {
  //transform
  //turn line into array of each column as an index
  var columns = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
  if (columns.length !== 3) {
    rl.flaggedFiles.write(`${line}\n`);
    return
  }

  if (isNaN(Number(columns[0]))) {
    rl.flaggedFiles.write(`${line}\n`);
    return};
  if (isNaN(Number(columns[1]))) {
    rl.flaggedFiles.write(`${line}\n`);
    return};
  if (columns[2].length < 7 || columns[2].length > 1000) {
    rl.flaggedFiles.write(`${line}\n`);
    return};

  rl.output.write(`${line}\n`);
  count++;
})
.on('close', () => {
  console.log(count)
})