var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the database
mongoose.connect('mongodb://test:test@ds123718.mlab.com:23718/todo-nodejs');

//Create a schema - it is like a blueprint
var TodoSchema = new mongoose.Schema({
	item :String
});

var Todo = mongoose.model('Todo', TodoSchema);

// var data = [{item: 'get bread'}, {item: 'code'}, {item: 'tell hi'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

app.get('/todo', function(req, res){
	//get data from mongodb and pass it to view
	Todo.find({}, function(err, data){
		if (err) throw err;
		res.render('todo', {todos: data});
	});
});

app.post('/todo', urlencodedParser, function(req, res){
	//get data from the view and add it to mongodb
	var newTodo = Todo(req.body).save(function(err, data){
		if (err) throw err;
		res.json(data);
	})
});

app.delete('/todo/:item', function(req, res){
	//delete the requested item from mongodb
	Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
		if (err) throw err;
		res.json(data);
	});
});

}
