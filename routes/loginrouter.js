const express = require('express');
const bodyParser = require('body-parser');
const mysql = require("mysql2/promise");

const loginRouter = express.Router();

loginRouter.use(bodyParser.json());

loginRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();     //continue to look for additional specification that will match /dishes
})
.get( async (req,res,next) => {
    user_id = req.body.user_id;
    user_pass = req.body.user_pass;

    const [uname] = await db.query(`SELECT * FROM users where user_id = "${user_id}";`);

    if(uname.length == 0){
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/json');
        res.json({return:"Wrong username and password combination"});
    }
    else if (uname[0].user_pass == user_pass ){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/json');
        res.json(uname[0]);
    }
})
.post(async (req, res, next) => {
    const user = {user_name: req.body.user_name,
                    user_pass: req.body.user_pass,
                    user_id: req.body.user_id,
                    isAdmin: 0 
                    }
    
                    console.log(db.query(`SELECT * FROM users where user_id = "${user.user_id}";`))
    
    const [uid] = await db.query(`SELECT * FROM users where user_id = "${user.user_id}";`);

    if(uid.length != 0){
        res.statusCode = 409;
        res.setHeader('Content-Type', 'text/json');
        res.json({return:"User Id already taken :("});
    }
    else {
        db.query(`INSERT INTO users (user_id, user_name, user_pass, isAdmin) VALUES ("${user.user_id}", "${user.user_name}", "${user.user_pass}", 0);`);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/json');
        res.json({status:"User added",user:user});
    }
})
.delete((req, res, next) => {
    res.end('Will add feature to delete profile later!');
})


module.exports = loginRouter;