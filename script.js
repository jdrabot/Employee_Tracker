const inquirer = require("inquirer");
const mysql = require("mysql");
require("dotenv").config();
const cTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect((err) => {
    if (err) throw err;
    runCompanyApp();
});

const runCompanyApp = () => {
    inquirer.prompt({
        type: "list",
        name: "choice",
        message: "Hello, what would you like to do?",
        choices: [
            "View Departements",
            "View Employees",
            "View Roles",
            "Add Department",
            "Add Employees",
            "Add Role",
            "Update Employee Role",
            "Cancel and Exit"
        ],
    }).then((res) => {
        switch (res.choice) {
            case "View Departments":
                viewDepartments();
                break;
            case "View Employees":
                viewEmployees();
                break;
            case "View Roles":
                viewRoles();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Add Employee":
                addEmplyee();
                break;
            case "Add Role":
                addRole();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            default:
                connection.end();
                break
        }
    });
};

const viewDepartments = () => {
    connection.query(

    )
}
const viewDepartments = () => {
    connection.query(

    )
}
const viewDepartments = () => {
    connection.query(

    )
}
const viewDepartments = () => {
    connection.query(

    )
}
const viewDepartments = () => {
    connection.query(

    )
}
const viewDepartments = () => {
    connection.query(

    )
}
const viewDepartments = () => {
    connection.query(

    )
}
