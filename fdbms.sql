create schema FDMS;
use fdms;
CREATE TABLE users (
 user_id VARCHAR(255) NOT NULL,
 user_name VARCHAR(255) NOT NULL,
 user_pass VARCHAR(255) NOT NULL,
 isAdmin BOOL,
 primary key (user_id)
 );
 
 CREATE TABLE users_details (
 user_id VARCHAR(255) NOT NULL,
 user_email VARCHAR(255) NOT NULL,
 user_phno VARCHAR(255) NOT NULL,
 user_addline VARCHAR(555) NOT NULL,
 user_pincode VARCHAR(555) NOT NULL,
 user_joindt date NOT NULL,
 foreign key (user_id) references users(user_id),
 primary key (user_email)
 );
 
 CREATE TABLE restaurant (
 rest_id VARCHAR(255) NOT NULL,
 rest_email VARCHAR(255) NOT NULL,
 rest_phno VARCHAR(255) NOT NULL,
 rest_addline VARCHAR(555) NOT NULL,
 rest_pincode VARCHAR(555) NOT NULL,
 rest_joindt date NOT NULL,
 rest_owner VARCHAR(255) NOT NULL,
 foreign key (rest_owner) references users(user_id),
 primary key (rest_id)
 );
 
 
 CREATE TABLE dishes (
 dish_id VARCHAR(255) NOT NULL,
 dish_name VARCHAR(255) NOT NULL,
 dish_price INT NOT NULL,
 isAvailable BOOL NOT NULL,
 dish_type VARCHAR(255),
 CONSTRAINT chk_dish_type CHECK (dish_type IN ('starter','main course','dessert', 'snack', "beverage")),
 dish_rest_id VARCHAR(255) NOT NULL,
 foreign key (dish_rest_id) references restaurant(rest_id),
 primary key (dish_id)
 );
 
  CREATE TABLE orders_history (
 order_id VARCHAR(255) NOT NULL,
 order_price INT NOT NULL,
 order_date DATE NOT NULL,
 order_qty INT NOT NULL,
 order_dish_id VARCHAR(255) NOT NULL,
 foreign key (order_dish_id) references dishes(dish_id),
 order_user_id VARCHAR(255) NOT NULL,
 foreign key (order_user_id) references users(user_id),
 primary key (order_id)
 );