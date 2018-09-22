import axios from 'axios'

const urlPrefix = "http://localhost:8080/";
const patientsUrl = 'patients';

const header = document.getElementById('header');
const textBlock = document.getElementById('timings');
const input = document.getElementById('input');

const buttonSave = document.getElementById('send');
const buttonDelete = document.getElementById('delete');
buttonSave.addEventListener('click', () => {
    if (event.type === 'click') {
        savePatients();
    }
});
buttonDelete.addEventListener('click', () => {
    if (event.type === 'click') {
        deletePatient(input.value);
    }
});

function getByUrl(url) {
    return axios.get(url);
}

function postByUrl(url, data) {
    return axios.post(url, data);
}

function deleteByUrl(url) {
    return axios.delete(url);
}

function getPatients() {
    return getByUrl(urlPrefix + patientsUrl);
}

function getServerMessage() {
    getByUrl(urlPrefix).then((res) => {
        header.innerText = res.data;
    })
}

function savePatients() {
    const promiseArr = [];
    for (let i = 1; i <= 10; i++) {
        promiseArr.push(postByUrl(urlPrefix + patientsUrl, {id: i, name: 'Patient' + i}))
    }
    console.log(promiseArr);
    Promise.all(promiseArr).then(res => {
        console.log(res);
        printPatients();
    })
    .catch(err => console.log(err));
}

function deletePatient(id) {
    if (id) {
        deleteByUrl(urlPrefix + patientsUrl + '/' + id)
        .then((res) => {
            console.log(res);
            printPatients();
        }).catch((err) => console.log(err));
    }
}

function printPatients() {
    getPatients().then(res => {
        console.log(res);
        fillTextBlock(res.data);
    })
}

function fillTextBlock(data) {
    textBlock.innerText = '';
    data.map(patient => textBlock.innerText = textBlock.innerText + patient.name + ", \n")
}

getServerMessage();
printPatients();

// Promises are immutable
// an immediately resolved promise
let p2 = Promise.resolve("foo");

// can get it after the fact, unlike events
p2.then((res) => console.log(res));

let p = new Promise((resolve, reject) => {
    setTimeout(() => resolve(4), 2000);
});

// handler can't change promise, just value
p.then((res) => {
    res += 2;
    console.log(res);
});

// still gets 4
p.then((res) => console.log(res));


function wrongErrCatch() {
    getByUrl(urlPrefix + patientsUrl + '/' + 1)
    .then(res => {
        // what will be printed at first?
        getByUrl(urlPrefix + patientsUrl + '/' + 2).then(res2 => {
            print(res2.data);
            print(res.data);
        });
        print(res.data);
    }, err => print(err))
}

// Wrong promise chain, because we are not waiting for resolving of second promise,
// another thing is wrong error catching
function wrongPromiseChain(){
    getByUrl().then(function(result1) {
        postByUrl().then(function(result2) {
            // do something with result1 and result2
        });
    },
    function(err) {
        // Errors from secondThingAsync() don't end up here!
    });
}


function promiseAll() {
    const promise1 = getByUrl(urlPrefix + patientsUrl + '/' + 1);
    const promise2 = getByUrl(urlPrefix + patientsUrl + '/' + 2);
    Promise.all([promise1, promise2]).then(res => {
        print(res);
    }).catch(err => print(err))
}

//Conclusion
function getPatientsById() {
    let res2;
    getByUrl(urlPrefix + patientsUrl + '/' + 1)
    .then(res => {
        print(res.data);
    })
    // we are not waiting for promise resolving, should be returned
    .then(() => getByUrl(urlPrefix + patientsUrl + '/' + 2).then(res => print(res.data)))
    // we are waiting for promise resolving
    .then(() => {
        return getByUrl(urlPrefix + patientsUrl + '/' + 3).then(res => {
            res2 = res;
        })
    })
    // catching the error
    .then(() => {
        // would get an error without return in second promise
        print(res2.data);
        return getByUrl(urlPrefix + patientsUrl + '/' + 14).then(res => print(res.data))
    })
    // catches all errors in nested promises and in promise chains, stops executing
    .catch(err => print(err))
}

// wrongErrCatch();
// promiseAll();
getPatientsById();

// just because its name is shorter
function print(message) {
    console.log(message);
}

// Promise Factory
// Right way:
// Promise returning functions to execute
function doFirstThing(){ return Promise.resolve(1); }
function doSecondThing(res){ return Promise.resolve(res + 1); }
function doThirdThing(res){ return Promise.resolve(res + 2); }
function lastThing(res){ console.log("result:", res); }

var fnlist = [ doFirstThing, doSecondThing, doThirdThing, lastThing];

// Execute a list of Promise return functions in series
function pSeries(list) {
    let p = Promise.resolve();
    // reduce function applies a reducer function to each list member
    // pacc = accumulator with return values
    // fn = current value
    return list.reduce((pacc, fn) => {
        //call each promise and pass values into pacc
        return pacc = pacc.then(fn);
    }, p);
}

pSeries(fnlist).then(res => console.log(res));
// result: 4

// Wrong way:
// list of fired Promises, not a factory now
fnlist = [ doFirstThing(), doSecondThing(), doThirdThing(), lastThing() ];

pSeries(fnlist).then(res => console.log(res));
// result: undefined
