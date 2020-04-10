let mysql = require('mysql');
let express = require('express')

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'apple123',
    database : 'DB_Diary'
});
let app = express()

app.set('port',3000);

app.get('/test', function (req, res) {

    connection.connect();
    connection.query('select * from T_article', function (error, results, fields) {
        if (error) throw error;
            //res.send('The solution is: ', results);
            res.send(results);
    });

    connection.end();

})

  
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
  });

