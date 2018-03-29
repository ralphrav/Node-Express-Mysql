const express = require('express');
const router  = express.Router();
const mysql = require('mysql');
const bodyparser = require('body-parser');

//Database Connection
const db = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'nodemysql'
});

db.connect((err) => {
	if(err){
		throw err;
		//console.log("Cannot Connect to Database");
	}
	console.log('Mysql Connected');
});

const app = express();

app.get('/sampleGet', (req, res) => {
	var id = req.query.id;
	res.send(id);
});

app.post('/samplePost', (req, res) => {
	var id = req.query.id;
	res.send(id);
});

//Create Database
app.get('/createdb', (req, res) => {
	let sql = 'CREATE DATABASE nodemysql';
	db.query(sql, (err, result) => {
		if(err) throw err;
		console.log(result);
		res.send('Database created');
	});
});

//Create table
app.get('/createposttable', (req, res) => {
	let sql = 'CREATE TABLE post(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
	db.query(sql, (err, result) => {
		if(err) throw err;
		console.log(result);
		res.send('Table created');
	});
});

//Insert data
app.get('/addpost', (req, res) => {
	var title = req.query.title;
	var body  = req.query.body;
	let post  = {title: title, body: body};
	let sql   = 'INSERT INTO post SET ?';
	let query = db.query(sql, post, (err, result) =>{
		if(err) throw err;
		console.log(result);
		res.send('Post one');
	});
});

//Select post
app.get('/getpost', (req, res) => {	
	let sql   = 'SELECT * FROM post';
	let query = db.query(sql, (err, result) =>{
		if(err) throw err;
		console.log(result);
		res.send('Post fetched');
	});
});

//Select Single post
app.get('/singlePost/:id', (req, res) => {	
	let sql   = `SELECT * FROM post where id = ${req.params.id}`;
	let query = db.query(sql, (err, result) =>{
		if(err) throw err;
		console.log(result);
		res.send('Post fetched');
	});
});

//Update post
app.get('/updatepost/:id', (req, res) => {
	let newTitle = 'Updated Title';
	let sql      = `UPDATE post SET title = '${newTitle}' WHERE id = ${req.params.id}`;
	let query = db.query(sql, (err, result) =>{
		if(err) throw err;
		console.log(result);
		res.send('Post fetched');
	});
});

//Delete post
app.get('/deletepost/:id', (req, res) => {
	let newTitle = 'Updated Title';
	let sql      = `DELETE FROM post WHERE id = ${req.params.id}`;
	let query = db.query(sql, (err, result) =>{
		if(err) throw err;
		console.log(result);
		res.send('Post Deleted');
	});
});

app.listen('3000', () => {
	console.log('Server started on port 3000');
});