const express = require('express')
const path = require('path')
const request = require('request')
const bodyParser = require('body-parser')
const fs = require('fs')
const uuid = require('uuid/v4')
const shell = require('shelljs');

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit: "100mb"}))
app.use(bodyParser.raw({limit: "100mb"}))

//setup endpoints

app.get('/ping', (request, response) => {
    response.send("pong\n")
})

app.post('/calculateVector', (request, response) => {
    
    console.log("received request\n")
    
    if (request.body == undefined || request.body["image"] == undefined) {
        response.send({status: 'failure'})
        return
    }
    
    //write file to disk
    let imageId = uuid()
    fs.writeFile("images/" + imageId + ".png", request.body["image"], 'base64', function(err) {})
    
    shell.exec("identify images/" + imageId + ".png", function(code, stdout, stderr) {
        response.send({analysisOutput: stdout})
    })
})


//publicize server

app.listen(8081)