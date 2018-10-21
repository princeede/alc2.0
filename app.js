var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var expressValidator = require("express-validator");
var session = require('express-session');
var flash = require('connect-flash');
var path = require('path');

// var dbname = "mongodb://localhost/alc";
//Using connection string from the Azure mongodb
var dbname = "mongodb://alc2:HSYRepmP15rql8SkSfRS97ULZEUdDHORIfamQQzS9BTd8gHayjGbBgKpxvDsxSZlcZgk8SEHEMtNxvdxna7eBg==@alc2.documents.azure.com:10255/?ssl=true";
mongoose.connect(dbname, { useMongoClient: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Problem connecting to database"));

// var mongoClient = require("mongodb").MongoClient;
// mongoClient.connect("mongodb://alc2:HSYRepmP15rql8SkSfRS97ULZEUdDHORIfamQQzS9BTd8gHayjGbBgKpxvDsxSZlcZgk8SEHEMtNxvdxna7eBg==@alc2.documents.azure.com:10255/?ssl=true", function (err, db) {
//   db.close();
// });

app.set('port', (process.env.PORT || 8000));

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
