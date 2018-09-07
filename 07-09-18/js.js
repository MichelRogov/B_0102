/**
 * var vs let
 */

var varNum = 3;
let letNum = 3;

console.log(window.varNum);
console.log(window.letNum);

for (var i = 0; i < 3; i++) {
    console.log('var i', i);
}

console.log('i', i);

for (let j = 0; j < 3; j++) {
    console.log('var j', j);
}

// throws an error
// console.log('j', j);

/**
 * const
 */

const obj = {id: 3};

// throws an error
// obj = [];

obj.id = 2;
console.log(obj);

/**
 * JS object
 */

const employee = {
    fName: 'Jones',
    lName: 'Dow',
    dep: 'Engineering',
    fullName: function () {
        return this.fName + ' ' + this.lName
    }
};

console.log(employee.fullName);
console.log(employee.fullName());

employee['age'] = 42;
console.log(employee);

const employeeCopy = employee;
employeeCopy.fName = 'Vasja';

console.log(employee.fullName());

console.log(Object.values(employee));

/**
 * comparison operators
 */

let stringNum = '1';
let flNum = 1;

if (stringNum == flNum) {
    console.log('string is equal float');
}

if (stringNum !== flNum) {
    console.log('string is NOT equal float');
}

console.log(flNum > 2 ? 'flNum is more that 2' : 'flNum is less or equal 2');

/**
 * arithmetic operators
 */

console.log(++stringNum);

flNum = 1.1;

console.log(++flNum);

console.log(stringNum + flNum);

/**
 * Object constructor
 */

function createEmployee (age, fName, lName, dep) {
    this.age = age;
    this.fName = fName;
    this.lName = lName;
    this.dep = dep;
    this.fullName = function () {
        return this.fName + ' ' + this.lName
    }
}

// new must be here
const newEmployee = new createEmployee(23, 'Alex', 'Pupkin', 'prod');

console.log(newEmployee.fullName());


/**
 * Scope
 */

function fullName() {
    return this.fName + ' ' + this.lName;
}

function createPerson(age, fName, lName, dep) {
    this.fName = fName;
    this.lName = lName;
    this.fullName = fullName;
}

// new must be here
const newPerson = new createPerson(23, 'Alex', 'Pupkin');

console.log(newPerson.fullName());

// let will not work because of missing scope
var fName = 'Vasja', lName = 'Ivanow';
console.log(fullName());

const arr = [10, 12, 15, 21];
for (var i = 0; i < arr.length; i++) {
    setTimeout(function() {
        console.log('Index: ' + i + ', element: ' + arr[i]);
    }, 300);
}

