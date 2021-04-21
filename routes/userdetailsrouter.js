const express = require('express');
const bodyParser = require('body-parser');
const mysql = require("mysql2/promise");

const userdetailsRouter = express.Router();

userdetailsRouter.use(bodyParser.json());

/////////////////////////////////////////////////////////////////////////////////
userdetailsRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();     //continue to look for additional specification that will match /dishes
})
.post( async (req,res,next) => {
    user_id = req.body.user_id;

    const [uname] = await db.query(`SELECT * FROM users_details, users where users.user_id = users_details.user_id having users.user_id = "${user_id}";`);

    if(uname.length == 0){
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/json');
        res.json({status:false});
    }
    else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/json');
        res.json(uname[0]);
    }
})
.put( async (req,res,next) => {
    const user = {user_id: req.body.user_id,
        user_email: req.body.user_email,
        user_phno: req.body.user_phno,
        user_addline: req.body.user_addline,
        user_pincode: req.body.user_pincode,
        user_joindt: req.body.user_joindt,
        }

    db.query(`UPDATE users_details SET user_email = "${user.user_email}", user_phno = "${user.user_phno}", user_addline= "${user.user_addline}", user_pincode= "${user.user_pincode}", user_joindt = "${user.user_joindt}" where user_id = "${user.user_id}";`);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/json');
    res.json(user);    
});

/////////////////////////////////////////////////////////////////////////////////
userdetailsRouter.route('/newuser')
.post(async (req, res, next) => {
    const user = {user_id: req.body.user_id,
                user_email: req.body.user_email,
                user_phno: req.body.user_phno,
                user_addline: req.body.user_addline,
                user_pincode: req.body.user_pincode,
                user_joindt: req.body.user_joindt,
                }
        
    const [uid] = await db.query(`SELECT * FROM users_details where user_id = "${user.user_id}";`);

    if(uid.length != 0){
        res.statusCode = 409;
        res.setHeader('Content-Type', 'text/json');
        res.json({status:false});
    }
    else {
        db.query(`INSERT INTO users_details VALUES ("${user.user_id}", "${user.user_email}", "${user.user_phno}", "${user.user_addline}", "${user.user_pincode}", '${user.user_joindt}');`);
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
      host:"localhost",
      user: "root",
      password: "PASS1234",
      database: "fdms",
      timezone: "+00:00",
      charset: "utf8mb4_general_ci",
    });
}
main();

module.exports = userdetailsRouter;