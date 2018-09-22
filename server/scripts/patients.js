const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const app = express();

app.use(bodyParser.json());

let patients = {};

app.get('/', function(req, res){
    res.send('Hello world')
});

app.get('/patients', function(req, res){
    res.send(_.values(patients));
});

app.get('/patients/:id', function(req, res){
    if (req.params && req.params.id && patients[req.params.id]){
        res.send(patients[req.params.id]);
    } else {
        res.sendStatus(404);
    }
});

app.delete('/patients/:id', function(req, res){
    if (req.params && req.params.id && patients[req.params.id]){
        delete patients[req.params.id];
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

app.delete('/patients/all', function(req, res){
        patients = {};
        res.sendStatus(200);
});

app.post('/patients', function(req, res){
    const patient = req.body;

    if (patient && patient.id){
        patients[patient.id] = patient;
        res.send(201, patient);
    } else {
        res.sendStatus(400);
    }
});

app.get('/health', function(req, res){
    const healthStatus = {
        temperature: 37.0,
        mood: "average"
    };

    res.send(healthStatus);
});


app.listen(8080, function(){
    console.log('Its alive!');
});
