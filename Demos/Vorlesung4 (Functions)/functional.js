//  Ein paar Beispiele zum funktionalen Programmieren
//
//  Ausgangspunkt: Funktion reduce mit einem Argument
//
//  Currying: Funktion mit mehreren Argumenten umwandeln 
//  in eine Folge von Funktionen mit nur einem Argument
//
const reduce = f => init => (array) => array.reduce(f, init)

//  Argumente werden nun einzeln übergeben
//  reduce (add) (0) ([1,2,3,4])
//  → 10
//  Das heisst:
//  reduce(add) liefert eine Funktion
//  reduce(add)(0) ebenfalls

//  Hilfsfunktionen
//  (Operatoren können in JavaScript nicht als Funktionenb
//  verwendet werden)
//
const add = (m, n) => m + n
const mul = (m, n) => m * n
const and = (m, n) => m && n
const or  = (m, n) => m || n

//  Summe der Zahlen in einem Array
//  Das Array (Parameter von sum) taucht in der Definition gar 
//  nicht auf, wir kombinieren nur Funktionen
//
const sum = reduce(add)(0)

//  Aufruf
//  sum([1,2,3,4])            
//  → 10

//  Nun kann man auch filter und map mit reduce implementieren
// 
const filter = (f) => reduce((c,n) => f(n) ? [...c,n] : c)([])
const map = (f) => reduce((c,n) => [...c,f(n)])([])

//  Aufrufe
//  filter(n=>n%2==0)([1,2,3,4,5])
//  → [ 2, 4 ]
//  map(n=>2*n)([1,2,3,4,5])
//  → [ 2, 4, 6, 8, 10 ]

//  Ebenso allTrue und someTrue
//
const allTrue = reduce(and)(true)
const someTrue = reduce(or)(false)

