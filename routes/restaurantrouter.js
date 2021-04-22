const express = require('express');
const bodyParser = require('body-parser');
const mysql = require("mysql2/promise");
const config = require('config');

const restaurantRouter = express.Router();

restaurantRouter.use(bodyParser.json());

restaurantRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();     //continue to look for additional specification that will match /dishes
})
.get( async (req,res,next) => {
    const [rows] = await db.query("SELECT * FROM restaurant;");
    res.json(rows);
    next();
})
.post((req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
.delete((req, res, next) => {
    res.end('Deleting all dishes');
});

async function main(){
    db = await mysql.createConnection({
      host: config.get('db.host'),
      user: config.get('db.user'),
      password: config.get('db.password'),
      database: config.get('db.database'),
      timezone: config.get('db.timezone'),
      charset: config.get('db.charset')
    });  
}
main();

module.exports = restaurantRouter;