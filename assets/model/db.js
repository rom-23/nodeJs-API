const mysql = require('mysql');
const config = require('../config');

//local mysql db connection
var connection = mysql.createConnection({
  host: config.db.host,
  database: config.db.database,
  user: config.db.user,
  password: config.db.password
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected to database, as id ' + connection.threadId);
});

module.exports = connection;
