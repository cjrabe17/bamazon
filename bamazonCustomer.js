var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) {
        throw err;
    }
    console.log("Connected as id " + connection.threadId);
    buyProduct();
});

function buyProduct() {
    var query = connection.query("SELECT * FROM products", function(err, res) {
        if (err) {
            throw err;
        }
        console.table(res);
        inquirer.prompt([
            {
                name: "choice",
                type: "input",
                message: "What is the item number of the product you would like to purchase?"
            },
            {
                name: "qty",
                type: "input",
                message: "How many would you like to purchase?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function(answer) {
            var chosenItem;
            for (var i = 0; i < res.length; i++) {
                if (res[i].item_id == answer.choice) {
                    chosenItem = res[i];
                }
            }
            var chosenQty;
            chosenQty = answer.qty;
            if (chosenItem.stock_quantity < parseInt(chosenQty)) {
                console.log("Insufficient quantity!");
                buyProduct();
            } else {
                updateProducts(chosenItem, chosenQty);
            }
        });
    });
}

function updateProducts(chosenItem, chosenQty) {
    var query = connection.query("UPDATE products SET ? WHERE ?",
    [
        {
            stock_quantity: chosenItem.stock_quantity - chosenQty
        },
        {
            item_id: chosenItem.item_id
        }
    ], function(err, res) {
        console.log("You have successfully purchased " + chosenQty + " units of " + chosenItem.product_name + "!\nYour total is " + (chosenItem.price * chosenQty) + ".\n");
        }
    );
    buyProduct();
}