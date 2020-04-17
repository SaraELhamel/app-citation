const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname,"style")));
var bodyParser = require('body-parser');
 var mysql      = require('mysql');
 var connection = mysql.createConnection({
   host     : 'localhost',
   user     : 'root',
   password : '',
   database: 'citations'
 });
 var urlencodedParser = bodyParser.urlencoded({
    extended: false
 })
 connection.connect(function (error) {
    //condition connect
     if (!!error) {
        console.log('Failed to connect :(');
     } else {
         console.log('Connected :D');
     }

 });

app.set('view engine','ejs');

app.get('/', function(req, res) {

    res.render('pages/Home');
});

 app.post('/quote', urlencodedParser, function(req, res) {
    connection.query('DELETE FROM `quotes` WHERE 1', function(err, rows, fields) {
        if (err) throw err;
        console.log('The solution is: ', rows);
      });

 });


app.listen(process.env.port || 3000,function(){
    console.log('now listening for request');
});