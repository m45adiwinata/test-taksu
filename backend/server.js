var express = require("express")
var cors = require("cors")
var bodyParser = require("body-parser")
var app = express()
var mongoose = require("mongoose")
var port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)

const mongoURI = 'mongodb://localhost:27017/test_taksu'

mongoose.connect(mongoURI, {useNewUrlParser: true }, (err) => {
	if (!err) {
    console.log('Connection Succeeded')
  }
  else{
    console.log(err)
  }
});

var Users = require('./routes/Routes')

app.use('/users', Users)

app.listen(port, () => {
    console.log("Server is running on port: " + port)
})