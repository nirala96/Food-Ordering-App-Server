const http = require('http');
const morgan = require('morgan');
const mysql = require("mysql2/promise");
const cors = require("cors");
const express = require("express");

const config = require('config');


const hostname = config.get('app.hostname');
const port = config.get('app.port');

let db = null;
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//////////////////////////////////

const loginRouter = require('./routes/loginrouter');
app.use('/login', loginRouter);

const userdetailsRouter = require('./routes/userdetailsrouter');
app.use('/userdetails', userdetailsRouter);

const dishRouter = require('./routes/dishrouter');
app.use('/dishes', dishRouter);

const orderhstryRouter = require('./routes/orderhstryrouter');
app.use('/orderhstry', orderhstryRouter);

const restaurantRouter = require('./routes/restaurantrouter');
app.use('/restaurant', restaurantRouter);


const server = http.createServer(app);

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

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});