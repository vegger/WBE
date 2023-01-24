/**
 *  Temperatur an einem bestimmten Ort bestimmen
 *  WBE Praktikum
 * 
 *  Neu verlangt der Service https zum Zugriff
 * 
 *  To do:
 *  - Kommandozeilenargumente prüfen
 *  - HTTP Response Code prüfen 
 *
 *  @author bkrt
 *  @version 2021-11-07
 */

let http = require('https')
let place = process.argv[2]
let url = `https://wttr.in/${place}?format=j1`

http.get(url, function (res) {
  var body = ''

  res.on('data', function (chunk) {
    body += chunk
  })

  res.on('end', function () {
    var data = JSON.parse(body)
    console.log(data.current_condition[0].temp_C + "°")
  })
  
}).on('error', function(e){
  console.log("Got an error: ", e)
})