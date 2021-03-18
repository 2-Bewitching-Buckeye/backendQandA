const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('csvFiles/product.csv'),
  output: fs.createWriteStream('cleanFiles/product_clean.csv'),
  crflDelay: Infinity
})

let count = 0;

rl.on('line', (line) => {
  //transform
  //turn line into array of each column as an index
  var columns = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);

  if (isNaN(Number(columns[0]))) {return};

  rl.output.write(`${line}\n`);
  count++;
})
.on('close', () => {
  console.log(count)
})