
const express = require('express')
const sls = require('serverless-http')
const app = express()
const mysql = require("mysql2");


const db = mysql.createPool({
  host: "mdeicalbilling.c7dcqmwvm5db.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "Password#098",
  database: "medicalbilling",
});


app.get('/medicine', function(req, res, next) {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Content-Type', 'application/json')
    const sqlGet = "SELECT * FROM medicine WHERE available = true";
    db.query(sqlGet, (error, result) => {
      res.send(result);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports.server = sls(app)