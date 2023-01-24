/**
 *  CVS nach JSON konvertieren
 *  WBE Praktikum
 * 
 *  Hier ist eine Lösung mit Promises
 *
 *  Das Parsen der CSV-Datei ist alles andere als robust, das heisst wir
 *  gehen von einer fehlerfreien CSV-Datei aus
 *
 *  @author bkrt
 *  @version 2021-10-25
 */

const {readFile, writeFile} = require("fs").promises;
const path = require('path')

//  Einstieg: Kommandozeilenargumente prüfen und Funktionen für
//  die einzelnen Schritte aufrufen
//
function csv2json () {
  if (process.argv.length != 4) {
    let script = path.basename(process.argv[1])
    console.error(`Usage: node ${script} <infile-csv> <outfile-json>`)
  } else {
    let inFile = process.argv[2]
    let outFile = process.argv[3]
    
    readCSVFile(inFile)
      .then(parseCSV)
      .then(data => writeJSONFile(outFile, data))
      .then(() => console.log("JSON data written"))
      .catch((err) => console.error("Sorry, an error occured: " + err))
  }
}

//  CSV-Datei lesen
//
function readCSVFile (filepath) {
  return readFile(filepath, 'utf8')
}

//  CSV-Daten analysieren und in ein JavaScript-Array konvertieren
//
//  Ich habe hier versucht, das Ganze ohne Schleifen umzusetzen; es geht
//  natürlich ebenso mit ein paar for-Schleifen (was bezüglich Zeit- und
//  Speicherplatzbedarf auch Vorteile hat)
//
function parseCSV (csv) {
  let lines = csv
    .split('\n')
    .filter(line=>line!=='')
    .map(line => parseStringsInLine(line))
    .map(line => line.split(',').map(item=>item.trim()))
  let attrs = lines[0]
  let obj = lines
    .slice(1)
    .map(line => line
      .map((item, i) => [attrs[i], item])
      .reduce((curr, [attr,val]) => { curr[attr]=val; return curr }, {}))
  return obj
}

//  Diese Funktion wurde nötig, da sich herausgestellt hat, dass es CSV-
//  Dateien gibt, welche Strings enthalten, in welchen Kommas anders 
//  interpretiert werden müssen. Kommas in Strings werden hier durch
//  Leerzeichen ersetzt.
//
function parseStringsInLine (line) {
  return (line
    .split('"')
    .map((x,i)=>i%2==1 ? x.replace(/,/g, " ") : x)
    .join('')
    .split("'")
    .map((x,i)=>i%2==1 ? x.replace(/,/g, " ") : x)
    .join('')
  )
}


//  JSON-Datei schreiben
//
function writeJSONFile (outFile, data) {
  return writeFile(outFile, JSON.stringify(data))
}

//  Hauptfunktion aufrufen
//
csv2json()
