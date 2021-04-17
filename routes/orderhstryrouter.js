const express = require('express');
const bodyParser = require('body-parser');
const mysql = require("mysql2/promise");

const orderhstryRouter = express.Router();

orderhstryRouter.use(bodyParser.json());

orderhstryRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();     //continue to look for additional specification that will match /dishes
})
.get( async (req,res,next) => {
    const [rows] = await db.query("SELECT * FROM orders_history;");
    res.json(rows);
    next();
})
.post((req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
.delete((req, res, next) => {
    res.end('Deleting all dishes');
})

async function main(){
    db = await mysql.createConnection({
      host:"localhost",
      user: "root",
      password: "PASS1234",
      database: "fdms",
      timezone: "+00:00",
      charset: "utf8mb4_general_ci",
    });
  
}

main();

module.exports = orderhstryRouter;