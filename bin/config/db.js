var mysql = require('mysql');

var db = mysql.createConnection({
  host     : 'heroku_44e8d37e9d01440',
  user     : 'bde278f5d67f80',
  password : '54565268',
  database : 'dftbot'
});
 
db.connect((err) => {
  if(!err)
      console.log('Database is connected!');
  else
      console.log('Database not connected! : '+ JSON.stringify(err, undefined,2));
  });

module.exports = db;
