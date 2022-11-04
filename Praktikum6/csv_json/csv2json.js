const fs = require('fs')
const input_file_path = process.argv[2] || './population.csv'
const output_file_path = process.argv[3] || './data.json'

const start_time = new Date()
//Get stats about input file
fs.stat(input_file_path, (err, stat) => {
  console.log(`Lesezeit: ${new Date() - start_time} ms`)
  console.log("Grösse der Datei: ", stat.size / 1000000, "MB")
  console.log(`Datum der letzten Änderung: ${stat.mtime}`)
})

//Read csv input file and store it to output file
let json = [];

fs.readFile(input_file_path, 'utf-8', (err, data) => {
  let entries = data.split('\n')
  console.log(`Anzahl Datensätze: ${entries.length - 1}`)

  for(let i = 1; i < entries.length; i++) {
    const entities = entries[i].split(',')
    json[i-1] = {
        "Entity": entities[0],
        "Code": entities[1],
        "Year": entities[2],
        "TotalPopulation": entities[3] 
    }
  }
  writeOutput()
})

function writeOutput() {
  fs.writeFileSync(output_file_path, JSON.stringify(json), "utf-8")
}