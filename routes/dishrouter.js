const express = require('express');
const bodyParser = require('body-parser');
const mysql = require("mysql2/promise");

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();     //continue to look for additional specification that will match /dishes
})
.get( async (req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    const [rows] = await db.query("SELECT * FROM dishes;");
    res.json(rows);
    next();
})
.post((req, res, next) => {
    const dish = {  dish_name: req.body.dish_name,
                    dish_price: req.body.dish_price,
                    isavailable: req.body.isavailable,
                    dish_type: req.body.dish_type.toLowerCase(),  //starter, main course, desserts 
                    dish_rest_id: req.body.dish_rest_id
                }

    if(dish.dish_type == "starter" || dish.dish_type == "main course" || dish.dish_type == "dessert" ){
        db.query(`INSERT INTO dishes (dish_name, dish_price, isavailable, dish_type, dish_rest_id) VALUES ("${dish.dish_name}", ${dish.dish_price}, ${dish.isavailable}, "${dish.dish_type}", "${dish.dish_rest_id}");`);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/json');
        res.json(dish);
    }else{
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/json');
        res.json({"status":"false"});
    }
});

dishRouter.route('/:dishID')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();     //continue to look for additional specification that will match /dishes
}).put((req, res, next) => {
    const dish = {  dish_name: req.body.dish_name,
                    dish_price: req.body.dish_price,
                    isavailable: req.body.isavailable,
                    dish_type: req.body.dish_type.toLowerCase(),  //starter, main course, desserts 
                    dish_rest_id: req.body.dish_rest_id
                }

    if(dish.dish_type == "starter" || dish.dish_type == "main course" || dish.dish_type == "dessert" ){
        db.query(`UPDATE dishes SET dish_name = "${dish.dish_name}", dish_price = ${dish.dish_price}, isavailable= ${dish.isavailable}, dish_type= "${dish.dish_type}", dish_rest_id = "${dish.dish_rest_id}" WHERE dish_id = ${req.params.dishID};`);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/json');
        res.json(dish);
    }else{
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/json');
        res.json({"status":"false"});
    }
})
.delete(async (req, res, next) => {
    await db.query(`DELETE FROM dishes WHERE dish_id = ${req.params.dishID};`);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/json');
    res.json({"status":"true"});
});

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

module.exports = dishRouter;