//  Person class
//
class Person {
  constructor (name) {
    this.name = name
  }
  toString () {
    return `Person with name '${this.name}'`
  }
}

//  Instance of Person
let p35 = new Person("John")

console.log(`Person instance: "${p35}"`)


//  Employee class
//
class Employee extends Person {
  constructor (name, salary) {
    super(name)
    this.salary = salary
  }
  toString () {
    return `${super.toString()} and salary ${this.salary}`
  }
}

//  Instance of Employee
let e17 = new Employee("Mary", 7000);

console.log(`Employee instance: "${e17}"`)
console.log('Salary: ' + e17.salary)


//  PartTimeEmployee class
//
class PartTimeEmployee extends Employee {
  constructor (name, salary, percentage) {
    super(name, salary)
    this.percentage = percentage
  }
  get salary100 () { return this.salary * 100 / this.percentage}
  set salary100 (amount) { this.salary = amount * this.percentage / 100 }
}

//  Instance of PartTimeEmployee
let e18 = new PartTimeEmployee("Bob", 4000, 50)

console.log(`PartTimeEmployee instance: "${e18}"`)
console.log('Salary:    ' + e18.salary)
console.log('salary100: ' + e18.salary100)

e18.salary100 = 9000
console.log('e18.salary100 = 9000')
console.log('Salary:    ' + e18.salary)
console.log('salary100: ' + e18.salary100)
