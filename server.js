var express = require("express");
var app = express();
var mongojs = require("mongojs");
var db = mongojs('todolist',['todolist']);
var bodyParser = require("body-parser");

app.use(bodyParser.json());
//In New York!!!

app.use(express.static(__dirname + "/public"));

app.get('/todolist', function(req, res){
	console.log("I received a GET request");

	db.todolist.find(function(err, docs){
		console.log(docs);
		res.json(docs);

	});

});

app.post("/todolist", function(req, res){
	console.log(req.body);
	db.todolist.save(req.body, function(err, docs){
		res.json(docs);
	});

});

app.delete('/todolist/:id', function (req, res) {
  var id = req.params.id;
  console.log("DELETE");
  console.log(id);
  db.todolist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/todolist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.todolist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
     res.json(doc);
  });
});

app.put('/todolist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.todolist.findAndModify(
   { query: {_id: mongojs.ObjectId(id)}, 
     update: {$set: {name: req.body.name, text: req.body.text, date: req.body.date, status:req.body.status}},
     new: true 
   }, function(err, doc){
     res.json(doc);
   });
});

app.listen(3000);

console.log("Server running on port 3000");

