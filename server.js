var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');

var config = {
    user: 'gylrghv',
    database: 'gylrghv',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

function hash(input,salt){
    var hashedValue = crypto.pbkdf2Sync(input,salt,1000,512,'sha512');
    return["pbkdf2","1000",salt,hashedValue.toString('hex')].join('$');
}

app.get('/hash/:input', function(req,res){
    res.send(hash(req.params.input,'this is a random string'));
});

app.post('/create-user',function(req,res){
    
    var username = req.body.username;
    var password = req.body.password;
    
    var salt = crypto.RandomBytes(128).toString('hex');
    var dbstring = hash(password,salt);
    pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)',[username,dbstring],function(req,res){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.status(200).send("User created successfully:"+ username);
        }        
    });
    
});

function createTemplate(data) {
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    
    var htmlTemplate = `
    <html>
        <head>
            <title>${title}</title>
            <link href='/ui/style.css' rel='stylesheet' />
        </head>
        <body>
            <div class='container'>
                <div>
                    <a href='/'>Home</a>
                </div>
                <hr>
                <h3>${heading}</h3>
                <hr>
                <div>
                    ${date.toDateString()}
                </div>
                <div>
                    ${content}
                </div>
            </div>    
        </body>
    </html>    
    `;
    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);

app.get('/test-db', function(req,res){
    pool.query('SELECT * FROM articles', function(err,result){
      if(err){
          res.status(500).send(err.toString());
      }else{
          res.status(200).send(JSON.stringify(result));
      }  
    });
});

var counter = 0;
app.get('/counter', function (req, res) {
  counter += 1; 
  res.send(counter.toString());
});

var names = [];
//1st method to extract name and then send as a response
/*app.get('/submit-name/:name',function(req,res){
    var name = req.params.name;
    names.push(name);
    res.send(JSON.stringify(names));
});
*/
//2nd method
app.get('/submit-name',function(req,res){       //url of type: /sumbit-name?name=xxxxx
    var name = req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});


app.get('/articles/:articleName', function(req,res){
    
    //to prevent sql query from sql injection we use $
    //pool.query("SELECT * FROM article WHERE title ='"+ req.params.articleName +"'", function(err,result){
    pool.query("SELECT * FROM article WHERE title =$1",[req.params.articleName], function(err,result){    
        if(err){
            res.status(500).send(err.toString());
        }else{
            if(result.rows.lenght === 0){
                res.status(404).send("Not found");
            }else{
                var articleData = result.rows[0];
                res.send(createTemplate(articleData)); 
            }
        }  
    });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
