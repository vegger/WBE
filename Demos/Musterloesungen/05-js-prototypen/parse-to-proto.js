/**
 *  WBE-Praktikum
 *  Aufgabe: JSON parsen und Objekt mit Prototyp versehen 
 */

function parseToProto (json, proto) {
  let obj = Object.assign(Object.create(proto), JSON.parse(json))
  return obj
}

module.exports = { parseToProto }

