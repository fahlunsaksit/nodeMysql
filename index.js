var mysql      = require('mysql');
const express = require('express');
var app = express();
var cors = require('cors')
const bodyparser = require('body-parser');
app.use(cors());
app.use(bodyparser.json());

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'random_number'
});

var num = [];
for (var i = 0; i < 10; i++) { 
	num.push(Math.floor(Math.random() * 90+10)); 
}
var str_query = '';
num.forEach(value => {
    str_query += "'"+value+"',";
});
console.log(str_query);

connection.connect();
 
app.listen(3000,()=>console.log('Express server is running at port no : 3000'));


//see data in db
app.get('/view',(req, res)=>{
  connection.query('select * from number_random', function (error, rows, fields) {
      if (error) throw error;
      // res.send(rows);
      // console.log(rows);
      res.render('index.ejs',{
        str: "select * from number_random",
        number: rows
      })
    });
});

// add data in db 
app.post('/add',(req, res)=>{
    num.forEach(value => {
        connection.query(`INSERT INTO number_random (number) VALUES ('${value}')`, function (error, rows, fields) {
            if (error) throw error;
            // res.send(rows);

          });
    });
});

//delete data
app.delete('/delete', function (req, res) {
    connection.query('delete from number_random', function (error, rows, fields) {
        if (error) throw error;
        // res.send(rows);
        res.send('deleted data');
      });
  })

// connection.end();

