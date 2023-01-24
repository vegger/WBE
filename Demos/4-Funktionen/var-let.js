// Am besten ist es, var zu vermeiden
// Mit var eingeführte Variablen können sogar erneut deklariert 
// werden:

function testVar () { 
  var s='eins'
  var s='zwei'
  console.log(s)
}

testVar()

// Das gilt nicht für let
// Die folgende Funktion produziert einen Syntax Error, wenn das
// zweite let nicht auskommentiert ist, was das gewünschte Verhalten 
// ist:

function testLet () { 
  let s='eins'
  // let s='zwei' 
  console.log(s)
}

testLet()

// Da Variablen mit var redeklariert werden können, können auch 
// mehrere Schleifen die gleiche Laufvariable enthalten; diese ist 
// aber auch ausserhalb der Schleife noch zugreifbar; daher auch 
// hier besser let verwenden:

function loop (n) {
  for (var i=0; i<n; i+=1) {
    console.log(i)
  }
  for (var i=0; i<n; i+=1) { 
    console.log(i)
  }
  console.log(i)
}

loop(3)
