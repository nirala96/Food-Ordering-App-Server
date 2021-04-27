const express = require('express');
const bodyParser = require('body-parser');
const mysql = require("mysql2/promise");
const config = require('config');

const restaurantRouter = express.Router();

restaurantRouter.use(bodyParser.json());

restaurantRouter.route('/')
.get( async (req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    const [rows] = await db.query("SELECT * FROM restaurant;");
    res.json(rows);
    next();
})
.post( async (req, res, next) => {
    const rest = {  rest_id: req.body.rest_id,
                    rest_email: req.body.rest_email,
                    rest_phno: req.body.rest_phno,
                    rest_addline: req.body.rest_addline,  
                    rest_pincode: req.body.rest_pincode,
                    rest_joindt: req.body.rest_joindt,
                    rest_owner_id: req.body.rest_owner_id,
                }

    const [rname] = await db.query(`SELECT * FROM restaurant WHERE rest_id = "${rest.rest_id}";`);

    if(rname.length == 0){
        const [oname] = await db.query(`SELECT * FROM users WHERE user_id = "${rest.rest_owner_id}";`);
        
        if(oname.length != 0){
            db.query(`INSERT INTO restaurant VALUES ("${rest.rest_id}", "${rest.rest_email}", "${rest.rest_phno}", "${rest.rest_addline}", "${rest.rest_pincode}", "${rest.rest_joindt}", "${rest.rest_owner_id}");`);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/json');
            res.json(dish);
        }else{
            res.statusCode = 403;
            res.setHeader('Content-Type', 'text/json');
            res.json({"status":"false"});
        }
    }else{
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/json');
        res.json({"status":"false"});
    }
});

restaurantRouter.route('/:restID')
.get( async (req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    const [rows] = await db.query(`SELECT * FROM restaurant WHERE rest_id = "${req.params.restID}";`);
    res.json(rows);
    next();
})

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