const express = require('express');

const app = express();
app.use(express.static(__dirname + '/AngularApp/dist'));

// Require path
const path = require('path');
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.json());

// Require Mongoose
var mongoose = require('mongoose');
// connect to mongodb using mongoose - "restful_api" is the name of the db for this project
mongoose.connect('mongodb://localhost/authors');

var AuthorSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 3}
}, {timestamps: true})
mongoose.model("Author",AuthorSchema);
var Author = mongoose.model("Author");

app.get('/', function (req, res){
    console.log('got hit');
    res.render('index');
});

app.get('/authors/', function(req,res){
    Author.find({}, function(err, authors) {
        if (err){
            console.log("error retrieving authors");
            res.json({message: "Error", error: err})
        } else {
            console.log("in server, authors: ", authors)
            res.json({message: "Success", data: authors})
        }
    })
})

app.get('/author/:id', function(req, res){
    Author.find({_id: req.params.id}, function (err, author){
        if (err){
            console.log("error retrieving author");
            res.json({message: "Error", error: err})
        } else {
            res.json({message: "Success", data: author})
        }
    })
})

app.delete('/author/:id', function(req,res){
    Author.findByIdAndRemove(req.params.id, function(err, author) {
        if (err){
            console.log("error deleting author");
            res.json({message: "Error", error: err})
        } else {
            console.log("in server, author: ", author)
            res.json({message: "Success", data: author})
        }        
    })
})

app.post('/author/', function(req,res){
    var author = new Author({"name": req.body.name});
    author.save(function(err){
        if (err){
            console.log("error creating the author");
            res.json({message: "Error", error: err})
        } else {
            res.json({message: "Success", data: author})
        }        
    })
})

app.put('/author/:id', function(req,res){
    console.log("in update route")
    Author.update({_id: req.params.id}, {name: req.body.name},{runValidators: true}, function (err){
        if (err){
            res.json({message: "Error", error: err})
        } else {
            res.json({message: "Success - Author Updated"})
        }
    });    
})


app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./AngularApp/dist/index.html"))
});

app.listen(8000, function() {
    console.log("Hello Angular listening on port 8000")
})
