CREATE SCHEMA FDMS;
 
USE FDMS;
 

 -- setting up db

CREATE TABLE users (
    user_id INT NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(255) NOT NULL,
    user_pass VARCHAR(255) NOT NULL,
    isAdmin BOOL,
    PRIMARY KEY (user_id)
);
 
 
CREATE TABLE users_details (
    user_id INT NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_phno VARCHAR(255) NOT NULL,
    user_addline VARCHAR(555) NOT NULL,
    user_pincode VARCHAR(555) NOT NULL,
    user_joindt DATE NOT NULL,
    FOREIGN KEY (user_id)
        REFERENCES users (user_id),
    PRIMARY KEY (user_email)
);
 
CREATE TABLE restaurant (
    rest_id INT NOT NULL AUTO_INCREMENT,
    rest_email VARCHAR(255) NOT NULL,
    rest_phno VARCHAR(255) NOT NULL,
    rest_addline VARCHAR(555) NOT NULL,
    rest_pincode VARCHAR(555) NOT NULL,
    rest_joindt DATE NOT NULL,
    rest_owner_id INT NOT NULL,
    FOREIGN KEY (rest_owner_id)
        REFERENCES users (user_id),
    PRIMARY KEY (rest_id)
);
 
 
CREATE TABLE dishes (
    dish_id INT NOT NULL AUTO_INCREMENT,
    dish_name VARCHAR(255) NOT NULL,
    dish_price INT NOT NULL,
    isAvailable BOOL NOT NULL,
    dish_type VARCHAR(255),
    CONSTRAINT chk_dish_type CHECK (dish_type IN ('starter' , 'main course',
        'dessert',
        'snack',
        'beverage')),
    dish_rest_id INT NOT NULL,
    FOREIGN KEY (dish_rest_id)
        REFERENCES restaurant (rest_id),
    PRIMARY KEY (dish_id)
);
 
CREATE TABLE orders_history (
    order_id INT NOT NULL AUTO_INCREMENT,
    order_price INT NOT NULL,
    order_date DATE NOT NULL,
    order_qty INT NOT NULL,
    order_dish_id INT NOT NULL,
    FOREIGN KEY (order_dish_id)
        REFERENCES dishes (dish_id),
    order_user_id INT NOT NULL,
    FOREIGN KEY (order_user_id)
        REFERENCES users (user_id),
    PRIMARY KEY (order_id)
);


--  populating the database
 
INSERT INTO `FDMS`.`users` (`user_name`, `user_pass`, `isAdmin`) VALUES 
('Arunoday kumar', 'pass', '0'),
('Kapil kumar', 'pass', '0'),
('Ashish Singh', 'pass', '1'),
('Shivam Malpaani', 'pass', '1');
 
INSERT INTO `FDMS`.`users_details` (`user_id`, `user_email`, `user_phno`, `user_addline`, `user_pincode`, `user_joindt`) VALUES 
('1', 'arunoday@gmail.com', '1111111111', 'Address of arunoday', '111111', '2021-04-24'),
('2', 'kapil@gmail.com', '2222222222', 'Address of kapil', '222222', '2021-04-24'),
('3', 'ashish@gmail.com', '3333333333', 'Address of ashish', '333333', '2021-04-24'),
('4', 'shivam@gmail.com', '4444444444', 'Address of shivam', '444444', '2021-04-24');
 
INSERT INTO `FDMS`.`restaurant` (`rest_email`, `rest_phno`, `rest_addline`, `rest_pincode`, `rest_joindt`, `rest_owner_id`) VALUES
('rest1@gmail.com', '1111111111', '1 apps, 1 street, 1 landmark restaurant', '111111', '2011-01-11', '1'),
('rest2@gmail.com', '2222222222', '2 apps, 2 street, 2 landmark restaurant', '222222', '2020-02-02', '1'),
('rest3@gmail.com', '3333333333', '3 apps, 3 street, 3 landmark restaurant', '333333', '2020-04-21', '2');
 
INSERT INTO `FDMS`.`dishes` (`dish_name`, `dish_price`, `isAvailable`, `dish_type`, `dish_rest_id`) VALUES
('Aloo paratha', '40', '1', 'main course', '1'),
('Gulab Jamun', '60', '1', 'dessert', '2'),
('Coca Cola', '20', '1', 'beverage', '1');