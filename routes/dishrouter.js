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
    const [rows] = await db.query("SELECT * FROM dishes;");
    res.json(rows);
    next();
})
.post((req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
.delete((req, res, next) => {
    res.end('Deleting all dishes');
});

// /degfngrklsnhkndfl
module.exports = dishRouter;