var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "sourworms1",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId);
    showProducts();
});

function showProducts() {
    var query = connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("Product: " + res[i].product_name + " | Price: $" + res[i].price + " | Qty: " + res[i].stock_quantity);
        }
    connection.end();
    });
    console.log(query.sql);
}