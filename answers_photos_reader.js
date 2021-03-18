const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('csvFiles/answers_photos.csv'),
  output: fs.createWriteStream('cleanFiles/answers_photos_clean.csv'),
  crflDelay: Infinity
})

let count = 0;

rl.on('line', (line) => {
  //transform
  //turn line into array of each column as an index
  var columns = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);

  if (isNaN(Number(columns[0]))) {return};
  if (isNaN(Number(columns[1]))) {return};
  if (columns[2].length < 7 || columns[2].length > 1000) {return};

  rl.output.write(`${line}\n`);
  count++;
})
.on('close', () => {
  console.log(count)
})