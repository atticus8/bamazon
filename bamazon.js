var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "password",

    database: "bamazon"
});

var customerPurchase = function() {
    inquirer.prompt([

        {
            type: "input",
            name: "item_id",
            message: "Enter the ID of the item"
        },

        {
            type: "input",
            name: "quantity",
            message: "Enter the quantity of the item"
        }
    ]).then(function(respond) {
       
        var item = input.item_id;
        var quantity = input.quantity;
        var dbQuery = "SELECT * FROM products WHERE ?";

        connection.query(dbQuery, {item_id: item}, function(err, data) {
            if (err) throw err;

            if (data.length === 0) {
                console.log("ERROR: ID does not match any item");
            } else {
                var productData = data[0];

                if (quantity <= productData.stock_quantity) {
                    console.log("Your order has been placed.")

                    var updateQueryStr = "UPDATE products SET stock_quantity = " + (productData.stock_quantity - quantity) + " WHERE item_id = " + item;

                    connection.query(updateQueryStr, function(err, data) {
                        if (err) throw err;
                        connection.end();


                    })

                } else {
                    console.log("please select a lower quantity");
                }
            }
        })
    })

}

customerPurchase();