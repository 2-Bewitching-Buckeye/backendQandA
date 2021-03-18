const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('csvFiles/tester.csv'),
  output: fs.createWriteStream('cleanFiles/tester_clean.csv'),
  crflDelay: Infinity
})

let count = 0;

rl.on('line', (line) => {
  //transform
  //turn line into array of each column as an index
  var columns = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g)
  console.log(columns)
  // if (columns.length !== 8) {
  //   console.log('I failed')
  // }
  //if line has already been seen, don't include
  //if column 1 is not a number, don't include, else include
  if (isNaN(Number(columns[0]))) {return}
  //if column 2 is not a number, don't include, else include
  if (isNaN(Number(columns[1]))) {return}
  //if column 3 length is less than 5 or greater than 1000, don't include, else include
  if (columns[2].length < 5 || columns[2].length > 1000) {return}
  //if column 4 length doesn't equal 10, don't include, else include
  if (columns[3].length === 10) {return}
  //if column 5 length is greater than 100, don't include, else include
  if (columns[4].length > 1000) {return}
  //if column 6 info isn't in email format, don't include, else include
  // if (!columns[5].match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {return}
  //if column 7 isn't 0 or 1, don't include, else include
  if (columns[6] !== 0 || columns[6] !== 1) {return}
  //
console.log('i made it')
  // rl.output.write(`${line}\n`);
  count++;
})
.on('close', () => {
  console.log('count')
})