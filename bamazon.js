var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "",
    database: "bamazon_db"
});
  
connection.connect(function(error){
    if(error) throw error;

    runBamazon();
});

function runBamazon(){
    inquirer.prompt({
        type: "list",
        name: "menu",
        message: "What would you like to do?",
        choices: ["LIST","ORDER","SEARCH"]
    }).then(function(response){
        if(response.menu=="LIST"){listBamazon();}
        if(response.menu=="ORDER"){orderBamazon();}
        if(response.menu=="SEARCH"){searchBamazon();}
    });
}

function listBamazon(){
    console.log("Listing all items...");
    console.log("---------------\n");
    connection.query("SELECT * FROM products",function(error,res){
        if(error) throw error;

        for(var i=0; i<res.length; i++){
            console.log(
                "\n ID: "+res[i].id+
                "\n Item: "+res[i].item+
                "\n Department: "+res[i].department+
                "\n Price: $"+res[i].price+
                "\n Quantity Left: "+res[i].stock
            );
            console.log("\n---------------");
        }

        returnBamazon();
    })
}

function searchBamazon(){
    inquirer.prompt({
        type: "input",
        name: "search",
        message: "Search by product ID: "
    }).then(function(response){
        connection.query("SELECT * FROM products WHERE id="+response.search,
        function(error,res){
            if(error) throw error;

            console.log("\n ID: "+res.id+
            "\n Item : "+res.item+
            "\n Department: "+res.department+
            "\n Price: $"+res.price);

            returnBamazon();
        })
    });
}

function orderBamazon(){
    var quantity;
    var location;
    inquirer.prompt({
        type: "list",
        name: "order",
        message: "Which item do you want to order? Search via ID"
    }).then(function(response){
        connection.query("SELECT * FROM products WHERE id="+response.search,
        function(error,res){
            if (error) throw error;

            //reassign location + quantity
            quantity = res.stock;
            location = res.id;

            //update if there's still stuff available
            if(quantity>0){
                console.log("Ordering...");
                quantity--;
                connection.query("UPDATE products SET ? WHERE ?",
                [{
                    stock: quantity
                },{
                    is: location
                }], function(error){
                    if (error) throw error;
                    console.log("Product ordered!");
                });
            } else {
                console.log("There's not enough left, sorry!");
            }

            returnBamazon();
        })
    });
}

//return to main menu
function returnBamazon(){
    console.log("\n------------------");
    inquirer.prompt({
        type: "list",
        name: "return",
        message: "Do you wish to return to the menu?",
        choices: ["Yes","No"]
    }).then(function(response){
        if(response.return == "Yes"){
            console.log("Returning to the main menu...");
            runBamazon();
        } else {
            console.log("Closing Bamazon...");
            connection.end();
        }
    });
}