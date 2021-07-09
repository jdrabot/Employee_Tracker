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
                addEmpolyee();
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
        "SELECT id As ID, name AS Department From department",
        (err, res) => {
            if (err) throw err;
            console.table("\nDEPARTMENTS", res);
            runCompanyApp();
        }
    );
};

const viewEmployees = () => {
    connection.query(
        "SELECT T1.id AS ID, concat(T1.first_name, ' ', T1.last_name) AS Name, concat(T2.first_name, ' ', T2.last_name) AS 'Reports To', jobs.title AS 'Job Title', jobs.salary AS Salary, department.name AS Department FROM employee T1 LEFT JOIN jobs ON (T1.jobs_id = jobs.id) LEFT JOIN department ON (jobs.department_id = department.id) LEFT JOIN employee T2 ON (T1.manager_id = T2.id)",
        (err, res) => {
            if (err) throw err;
            console.table("\nEMPLOYEES", res);
            runCompanyApp();
        }
    );
};

const viewRoles = () => {
    connection.query(
        "SELECT roles.id AS ID, roles.title AS Title, roles.salary AS Salary, department.name AS Department FROM jobs LEFT JOIN department ON (jobs.department_id = department.id)",
        (err, res) => {
            if (err) throw err;
            console.table("\nROLES", res);
            runCompanyApp();
        }
    );
};

const addDepartment = () => {
    inquirer.prompt(
        {
            type: "input",
            name: "departName",
            message: "What is the new department?",
        }
    ).then((response) => {
        connection.query(
            "INSERT INTO department SET ?",
            {
                name = response.name
            },
            (err) => {
                if (err) throw err;
                console.log(`\nDepartment ${response.departname} was added\n`);
                runCompanyApp();
            }
        );
    });
};

const addEmpolyee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?",
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?"
        },
        {
            type: "input",
            name: "salary",
            message: "How much does the employee make?"
        },
        {
            type: "list",
            name: "roles",
            message: "what is the employee's role?",
            choices: function () {
                var jobsList = [],
                for (let i = 0; i < res.length; i++) {
                    jobsList.push(res[i].title);
                }
                return jobsList;
            },
        },
    ]
    )
        .then((response) => {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    name = response.name
                },
                (err) => {
                    if (err) throw err;
                    console.log(`\nDepartment ${response.departname} was added\n`);
                    runCompanyApp();
                }
            );
        });
};

const addRole = () => {
    connection.query(

    )
}
const updateEmployeeRole = () => {
    connection.query(

    )
}
