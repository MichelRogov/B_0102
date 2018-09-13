/**
 * Object keys
 */

const obj = {name: 'Joe', age: 24};

for (let key in obj) {
    console.log(key);
}

console.log(Object.keys(obj));
console.log(Object.values(obj));
console.log(Object.entries(obj));

/**
 * Object fields constructor
 */

function objConstructor(args) {

    return new function () {
        for (let key in args) {
            this[args[key]] = args[key];
        }
    };
    var code = '';
    for (var i = 0; i < args.length; i++) {
        code = code + ' this.' + args[i] + ' = ' + args[i] + ';';
    }
    return new Function(args, code);
}

var objCon = objConstructor(['name', 'salary']);
objCon.name = 'vasja';
objCon.salary = '111111';
console.log(obj);

/**
 * Inheritance constructor to object
 */

function Animal() {
    this.full = false;
}

function Cat() {
    this.eat = function () {
        this.full = true
    };
}

function AnimalGlobal() {
    this.global = {full: false};
}

function CatGlobal() {
    this.eat = function () {
        this.global.full = true
    };
}

Cat.prototype = new Animal();

var c1 = new Cat();
var c2 = new Cat();
var c3 = new Cat();
c1.eat();
console.log('c1= ' + c1.full + ', c2= ' + c2.full + ', c3= ' + c3.full);

CatGlobal.prototype = new AnimalGlobal();
var c1 = new CatGlobal();
var c2 = new CatGlobal();
var c3 = new CatGlobal();
c1.eat();
console.log('c1= ' + c1.global.full + ', c2= ' + c2.global.full + ', c3= ' + c3.global.full);

/**
 * Inheritance object to object
 */

var father = {
    obj: {name: 'Sasha', age: 59},
    arr: [8, 3, 11],
    val: 5
}

var son = {};

son.__proto__ = father;
console.log(father);
console.log(son);

son.obj.name = 'Masha';
son.arr[1] = 33;
// primitives cant be changed from inheritors
son.val = 68;
console.log(father);
console.log(son);


/**
 * Object freeze
 */

// object
// description

function Circle(r) {
    this.r = r;
    this.area = function () {
        return Circle.PI * this.r * this.r;
    };
    let getR = function () {
        return r
    };
    Object.defineProperty(this, 'r', {
        get: function () {
            return getR() * 2
        }
    });
    Object.defineProperty(this, 'area', {writable: false});
    // Object.seal(this);
}

Circle.PI = 3.1415926536;
// Object.freeze(Circle);

// END

let circle = new Circle(5);
for (let key in circle) {
    console.log(key);
}
console.log(circle.r);
delete circle.area;
circle.r = 7;

Object.defineProperty(circle, 'r', {writable: false});
circle.r = 11;
console.log(circle.r);
Object.defineProperty(circle, 'r', {configurable: false});
console.log(circle.r);
Object.defineProperty(circle, 'area', {enumerable: false});
console.log(Object.getOwnPropertyDescriptor(circle, 'r'));
for (let key in circle) {
    console.log(key);
}

// Object.seal

// It prevents adding and/or removing properties from the sealed object
// Can throw a TypeError when attempting to modify (most commonly in strict mode)
// Using delete will return false
// It makes every property non-configurable, and they cannot be converted from data accessors to properties (and vice versa)
// Object.freeze

// Exactly what Object.seal does, plus:
// It prevents changing any existing properties


/**
 * Function params
 */

function sum() {
    console.log(arguments);
    //throws an error, use prototype instead
    // arguments.forEach();
    Array.prototype.forEach.call(arguments, i => console.log(i));

    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
        sum = sum + arguments[i];
    }
    return sum;
}

console.log(sum(1, 2, 3, 4, 45));
