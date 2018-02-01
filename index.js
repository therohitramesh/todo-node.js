var express = require('express');
var todoController = require('./controllers/todoControllers')

var app = express();

//set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public')); //isn't route specific now, applies to every url

//fire controllers
todoController(app);

//listen to port
app.listen(3000);
console.log('You are listening to port 3000');