
var varNum = 3;
let letNum = 3;

console.log(window.varNum);
console.log(window.letNum);

for (var i = 0; i < 3; i++){
    console.log('var i', i);
}

console.log('i', i);

for (let j = 0; j < 3; j++){
    console.log('var j', j);
}

// console.log('j', j);

const obj = {id: 3};

// obj = [];
obj.id =2;
console.log(obj);

const employee = {
    firstName: 'Jones',
    lastName: 'Dow',
    dep: 'Engineering',
    fullName: function() {return this.firstName + this.lastName}
};

console.log(employee.fullName());
