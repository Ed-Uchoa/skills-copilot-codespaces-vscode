// Create web server
// Load the express module
const express = require('express');
const app = express();
const port = 3000;
// Load the body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// Load the mysql module
const mysql = require('mysql');
// Create a connection to mysql
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'comments'
});
con.connect(function(err) {
    if (err) throw err;
    console.log('Connected to the database!');
});
// Create a GET request
app.get('/comments', function(req, res) {
    let sql = 'SELECT * FROM comments';
    con.query(sql, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
});
// Create a POST request
app.post('/comments', function(req, res) {
    let sql = 'INSERT INTO comments (comment) VALUES (?)';
    con.query(sql, [req.body.comment], function(err, result) {
        if (err) throw err;
        res.send(result);
    });
});
// Start the web server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
// End of comments.js