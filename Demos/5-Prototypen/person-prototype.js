//  Person constructor
//
function Person (name) {
  this.name = name
}
Person.prototype.toString = function () {
  return `Person with name '${this.name}'`
}

//  Instance of Person
let p35 = new Person("John")

console.log(`Person instance: "${p35}"`)


//  Employee constructor
// 
function Employee (name, salary) {
  Person.call(this, name)
  this.salary = salary
}
Employee.prototype = new Person()
Employee.prototype.constructor = Employee

//  Instance of Employee
let e17 = new Employee("Mary", 7000)

console.log(`Person instance: "${e17}"`)
console.log('Salary: ' + e17.salary)

