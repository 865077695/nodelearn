/**
 * Created by zzq on 2017/6/27.
 */
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123123',
    database: 'myblog'
});

connection.connect();
connection.query('select name from users', function(err, rows, fields) {
    if (err) throw err;
    console.log('The result is: ', rows[0].name);
});
connection.query('select * from session', function(err,rows,fields){
    "use strict";
    if(err) throw err;
    console.log('The session is: ', rows[0].session);
})
connection.end();
