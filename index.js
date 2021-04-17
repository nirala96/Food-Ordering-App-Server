const express = require("express");
const http = require('http');
const morgan = require('morgan');
const mysql = require("mysql2/promise");


const hostname = 'localhost';
const port = 3000;

let db = null;
const app = express();
app.use(morgan('dev'));
app.use(express.json());

//////////////////////////////////

const dishRouter = require('./routes/dishrouter');
app.use('/dishes', dishRouter);

const orderhstryRouter = require('./routes/orderhstryrouter');
app.use('/orderhstry', orderhstryRouter);

const restaurantRouter = require('./routes/restaurantrouter');
app.use('/restaurant', restaurantRouter);

const usersRouter = require('./routes/usersrouter');
app.use('/user', usersRouter);

const userdetailsRouter = require('./routes/userdetailsrouter');
app.use('/userdetails', userdetailsRouter);


/////////////////////////
app.post('/create-user', async(req, res, next)=>{
  const no = req.body.no;
  const cname = req.body.cname;

  await db.query("INSERT INTO customer (Customerno, Cname) VALUES (?, ?);", [no, cname]);
  console.log('added '+ no + " "+ cname);
  res.json({status:"OK"});
  next();
});

////////////////////////////////////////////////
app.get('/item', async (req, res, next) => {

  const [rows] = await db.query("SELECT * FROM item;");
  res.json(rows);
  next();
});
app.get('/cyka', async (req, res, next) => {

  const [rows] = await db.query("SELECT * FROM customer;");
  res.json(rows);
  next();
});


// app.use('/',(req, res, next) => {
//   // console.log(req.headers);
//   res.statusCode = 403;
//   res.setHeader('Content-Type', 'text/html');
//   res.json({status:"403",prob:"Enter an Endpoint"});
// });

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});