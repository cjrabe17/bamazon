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
    start();
});

function start() {
    inquirer.prompt([
        {
            name: "choice",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        }
    ]).then(function(answer) {
        switch (answer.choice) {
            case "View Products for Sale":
                return viewProducts();

            case "View Low Inventory":
                return viewLowInventory();

            case "Add to Inventory":
                return addInventory();

            case "Add New Product":
                return addProduct();

            default:
                return viewProducts();
        }
    });
}

function viewProducts() {
    var query = connection.query("SELECT * FROM products", function(err, res) {
        if (err) {
            throw err;
        }
        console.table(res);
        start();
    })
}

function viewLowInventory() {
    console.log("made it this far");
    var query = "SELECT item_id, product_name, stock_quantity FROM products WHERE stock_quantity < 5";
    connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id + " |  Product: " + res[i].product_name + " | Current Quantity: " + res[i].stock_quantity);
        }
    start();
    });
}

function addInventory() {
    inquirer.prompt([
        {
            name: "itemToUpdate",
            type: "input",
            message: "What is the item number that you would like to update?",
        },
        {
            name: "updatedQty",
            type: "input",
            message: "What should the updated quantity be?"
        }
    ]).then(function(answer) {
        var query = connection.query("UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: answer.updatedQty
            },
            {
                item_id: answer.itemToUpdate
            }
        ],function(err, res) {
            console.log("Successfully updated.");
            viewProducts();
        });
    });
}

function addProduct() {
    inquirer.prompt([
        {
            name: "itemId",
            type: "input",
            message: "What is the id of the item you'd like to add?"
        },
        {
            name: "productName",
            type: "input",
            message: "What is the name of the product you'd like to add?"
        },
        {
            name: "deptName",
            type: "input",
            message: "In what department does this item belong?"
        },
        {
            name: "retail",
            type: "input",
            message: "What is the retail price of the item?"
        },
        {
            name: "stockQty",
            type: "input",
            message: "How many do you want to add?"
        },
    ]).then(function(answer) {
        var query = connection.query("INSERT INTO products SET?",{
            item_id: answer.itemId,
            product_name: answer.productName,
            department_name: answer.deptName,
            price: answer.retail,
            stock_quantity: answer.stockQty
        }, function(err, res) {
            console.log("Product added successfully.");
            viewProducts();
        });
    });
}