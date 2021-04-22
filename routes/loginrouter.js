const express = require('express');
const bodyParser = require('body-parser');
const mysql = require("mysql2/promise");
const config = require('config');

const loginRouter = express.Router();

loginRouter.use(bodyParser.json());

/////////////////////////////////////////////////////////////////////////////////
loginRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();     //continue to look for additional specification that will match /dishes
})
.post( async (req,res,next) => {
    user_id = req.body.user_id;
    user_pass = req.body.user_pass;

    const [uname] = await db.query(`SELECT * FROM users where user_id = "${user_id}";`);

    if(uname.length == 0){
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/json');
        res.json({"status":"false"});
    }
    else if (uname[0].user_pass == user_pass ){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/json');
        res.json(uname[0]);
    }else{
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/json');
        res.json({"status":"false"});
    }
});

/////////////////////////////////////////////////////////////////////////////////
loginRouter.route('/newuser')
.post(async (req, res, next) => {
    const user = {  user_name: req.body.user_name,
                    user_pass: req.body.user_pass,
                    user_id: req.body.user_id,
                    isAdmin: 0 
                }
        
    const [uid] = await db.query(`SELECT * FROM users where user_id = "${user.user_id}";`);

    if(uid.length != 0){
        res.statusCode = 409;
        res.setHeader('Content-Type', 'text/json');
        res.json({"status":"false"});
    }
    else {
        db.query(`INSERT INTO users (user_id, user_name, user_pass, isAdmin) VALUES ("${user.user_id}", "${user.user_name}", "${user.user_pass}", 0);`);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/json');
        res.json(user);
    }
})
.delete((req, res, next) => {
    res.end('Will add feature to delete profile later!');
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

module.exports = loginRouter;