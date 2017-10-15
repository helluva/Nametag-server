const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit: "100mb"}))
app.use(bodyParser.raw({limit: "100mb"}))

app.get('/ping', (request, response) => {
    response.send("pong\n")
})

app.post('/hostImage', (request, response) => {
    
    console.log("received request\n")
    
    //console.log(request.body)
    
    if (request.body == undefined || request.body["image"] == undefined || request.body["imageName"] == undefined) {
        response.send({status: 'failure'})
        return
    }
    
    //write file to disk
    fs.writeFile("images/" + request.body["imageName"] + ".png", request.body["image"], 'base64', function(err) {})
    
    response.send({url: 'http://server.calstephens.tech:8081/images/' + request.body["imageName"] + '.png'})
})

function makeDirectoryPublic(name) {
    app.use(express.static(__dirname + name));
    app.use(name, express.static(__dirname + name));
}

['/images'].forEach(makeDirectoryPublic)

const PORT = 8081
app.listen(PORT)
console.log('[' + new Date().toUTCString() + ']', 'Server listening on port', PORT)
