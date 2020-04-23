let mysql = require('mysql');
let express = require('express')


const connection = mysql.createPool(
    {
        host     : 'localhost',
        user     : 'root',
        password : 'apple123',
        database : 'DB_Diary'
    }
);

var connectDB  = (callback) => {
    var con = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'apple123',
        database : 'DB_Diary'
    });
    con.connect((err)=>{
        if(err){
            console.log(err);
            con.end();
            throw err;
        }else{
            console.log('DB서버 접속성공!');
            callback(con);
        }
    });
};




let app = express()

app.set('port',3000);
app.set('etag', 'strong');  
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/test', function (req, res) {
    
    connection.query('select * from T_article', function (error, results, fields) {
        if (error) throw error;
            //res.send('The solution is: ', results);
            res.append('Last-Modified', (new Date("now")).toUTCString());
            res.send(results);
            
    })
})

app.get('/getmonth', function (req, res) {
    
    connection.query(
        `
        select DATE_FORMAT(writetime,"%Y-%m") as dates,count(*) as count
        from T_article
        where writetime
        group by dates
        `
    , function (error, results, fields) {
        if (error) throw error;
            //res.send('The solution is: ', results);
            res.append('Last-Modified', (new Date("now")).toUTCString());
            res.send(results);
            
    })
})



  
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
  });

