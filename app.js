var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var expressValidator = require("express-validator");
var session = require('express-session');
var flash = require('connect-flash');
var path = require('path');

var dbname = "mongodb://localhost/alc";
mongoose.connect(dbname, { useMongoClient: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Problem connecting to database"));

app.set('port', (proc.env.PORT || 8000));

//set view engine
app.use(express.static(__dirname + '/views'));
app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');

//Body-Parser middleware for parsing form contents
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(expressValidator());
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

app.use(flash());
var alc = require("./routes/alc");
app.use('/', alc);


app.listen(app.get('port'), function(){
	console.log("ALC Listening on port ", app.get('port'))
});
