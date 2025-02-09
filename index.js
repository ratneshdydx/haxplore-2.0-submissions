const port = 3000 || process.env.PORT;
const express = require('express');
const mysql = require('mysql');
const path = require('path');
var bodyParser = require('body-parser');
const multer = require("multer");
const app = express();
const db = require('./dbcon');
express().use(bodyParser.urlencoded({ extended: true }));
express().use(bodyParser.json())


app.get('/',(req,res)=>{
    res.send("Hello World");
});

app.get('/login',(req,res)=>{
    res.send("Login");
});

app.get('/register',(req,res)=>{
    res.send("Register");
});

app.post('/get', (req, res) => {
    res.send('Recieved');
})

app.post('/signup', (req,res) => {
    console.log(req.body);
    data = {
        name : req.body.name,
        username : req.body.username,
        email : req.body.email,
        password : req.body.password
    };
    db.query('INSERT INTO user SET ?',data,(err,res)=>{
        if(err) throw err;
        console.log(res);
        
    });   
    res.send("Successful Sign up");
}); 
app.post('/login',(req,res) => {
     
    let sql= 'SELECT * FROM user WHERE username = ?';
    //console.log(data);
    db.query(sql,req.body.username,(err,resu) => {
        if(err) throw err; 
        
        console.log(resu); 
        if(resu.length<1)
        res.send("Invalid username or password");
        else if(resu[0].password == req.body.password) 
        res.send("Successful Login"); 
        else res.send("Invalid username or password");
    });   
    
});

app.listen(port,()=>{
    console.log(`Running on port ${port}`);
});