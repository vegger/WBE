const fs = require('fs')
const input_file_path = process.argv[2] || './population.csv'
const output_file_path = process.argv[3] || './data.json'

let data = fs.readFileSync(input_file_path, 'utf-8')

let entries = data.split('\n')
let json = [];

for(let i = 1; i < entries.length; i++) {
  const entities = entries[i].split(',')
  json[i-1] = {
      "Entity": entities[0],
      "Code": entities[1],
      "Year": entities[2],
      "TotalPopulation": entities[3] 
  }
}

fs.writeFileSync(output_file_path, JSON.stringify(json), "utf-8");
