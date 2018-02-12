DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER(10) NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
	VALUES (1, "Squatty Potty", "Home Goods", 19.99, 60),
					(2, "Apple iPad", "Consumer Electronics", 399.99, 5),
					(3, "Tide Pods", "Sundries", 29.99, 300),
                    (4, "A. Marc Turtlenecks", "Apparel", 0.02, 12),
                    (5, "Carnuba Wax", "Automotive", 39.99, 50),
                    (6, "ProForm Treadmill", "Exercise Equipment", 699.99, 7),
                    (7, "Blue Eyeshadow", "Health & Beauty", 7.99, 1000),
                    (8, "Sweet Pea Dollhouse", "Toys", 37.99, 7),
                    (9, "Dynatrap Insect Trap", "Lawn & Garden", 69.99, 4),
                    (10, "LG French-Door Refrigerator", "Appliances", 1299.99, 1),
                    (11, "Men's Rolex", "Jewelry", 29995.00, 1);