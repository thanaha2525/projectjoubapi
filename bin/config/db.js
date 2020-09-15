var mysql = require('mysql');

var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'dftbot'
});
 
db.connect((err) => {
  if(!err)
      console.log('Database is connected!');
  else
      console.log('Database not connected! : '+ JSON.stringify(err, undefined,2));
  });

module.exports = db;
