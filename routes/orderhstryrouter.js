const express = require('express');
const bodyParser = require('body-parser');
const mysql = require("mysql2/promise");
const config = require('config');

const orderhstryRouter = express.Router();

orderhstryRouter.use(bodyParser.json());

orderhstryRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();     //continue to look for additional specification that will match /dishes
})
.get( async (req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    const [rows] = await db.query("SELECT * FROM orders_history;");
    res.json(rows);
    next();
})
.post(async (req, res, next) => {
    const order = { order_price: 0,
                    order_date: req.body.order_date,
                    order_qty: req.body.order_qty,
                    order_user_id: req.body.order_user_id,  
                    order_dish_id: req.body.order_dish_id
                }
    
    const [temp] = await db.query(`SELECT dish_price FROM dishes WHERE dish_id = ${order.order_dish_id}`);
    order.order_price = temp[0].dish_price * order.order_qty;
    await db.query(`INSERT INTO orders_history (order_price, order_date, order_qty, order_user_id, order_dish_id) VALUES (${order.order_price},'${order.order_date}', ${order.order_qty}, "${order.order_user_id}", ${order.order_dish_id});`);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/json');
    res.json(order);
    
});

orderhstryRouter.route('/:dishID') 
.get( async (req,res,next) => {         //for admin or user to get sales or purchase of particular dishes
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    const [rows] = await db.query(`SELECT * FROM orders_history WHERE order_dish_id = ${req.params.dishID};`);
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

module.exports = orderhstryRouter;