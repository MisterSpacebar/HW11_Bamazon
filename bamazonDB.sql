DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
	id INT AUTO_INCREMENT,
    item VARCHAR (200) NOT NULL,
    department VARCHAR (200) NOT NULL,
    price INT (10) NOT NULL,
    stock INT (10) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products (item,department,price,stock)
VALUES ("Sony MDR V6","Audio",80,2500);

INSERT INTO products (item,department,price,stock)
VALUES ("Sennheiser HD8 DJ","Audio",250,350);

INSERT INTO products (item,department,price,stock)
VALUES ("Logitech MX Master","Electronics",100,400);

INSERT INTO products (item,department,price,stock)
VALUES ("Corsair Scimitar RGB Pro","Electronics",80,150);

INSERT INTO products (item,department,price,stock)
VALUES ("Shifting Realms Board Game","Games",65,100);

INSERT INTO products (item,department,price,stock)
VALUES ("Magic: the Gathering, Dominaria Booster Box","Games",100,1200);

INSERT INTO products (item,department,price,stock)
VALUES ("DC Comics Deck-Building Game","Games",20,600);

INSERT INTO products (item,department,price,stock)
VALUES ("Urth Post-Shave Elixir","Men's Accessories",350,1000);

INSERT INTO products (item,department,price,stock)
VALUES ("Fossil Jumper/S Polarized Sunglasses","Men's Accessories",160,250);

INSERT INTO products (item,department,price,stock)
VALUES ("AKRacing MAX","Office Supplies",500,25);

INSERT INTO products (item,department,price,stock)
VALUES ("Visconti Van Gogh Collection Fountain Pen","Office Supplies",290,15);