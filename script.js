const inquirer = require("inquirer");
const mysql = require("mysql");
require("dotenv").config();
const cTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "password",
    database: "company_db"
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
            "View Departments",
            "View Employees",
            "View Roles",
            "Add Department",
            "Add Employee",
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
        "SELECT T1.id AS ID, concat(T1.first_name, ' ', T1.last_name) AS Name, concat(T2.first_name, ' ', T2.last_name) AS 'Reports To', roles.title AS 'Role Title', roles.salary AS Salary, department.name AS Department FROM employee T1 LEFT JOIN roles ON (T1.roles_id = roles.id) LEFT JOIN department ON (roles.department_id = department.id) LEFT JOIN employee T2 ON (T1.manager_id = T2.id)",
        (err, res) => {
            if (err) throw err;
            console.table("\nEMPLOYEES", res);
            runCompanyApp();
        }
    );
};

const viewRoles = () => {
    connection.query(
        "SELECT roles.id AS ID, roles.title AS Title, roles.salary AS Salary, department.name AS Department FROM roles LEFT JOIN department ON (roles.department_id = department.id)",
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
                name: response.departName
            },
            (err) => {
                if (err) throw err;
                console.log(`\nDepartment ${response.departName} was added\n`);
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
            type: "list",
            name: "roles",
            message: "what is the employee's role?",
            choices: function () {
                return new Promise((resolve, reject) => {
                    connection.query(
                        "SELECT roles.id AS ID, roles.title AS Title, roles.salary AS Salary, department.name AS Department FROM roles LEFT JOIN department ON (roles.department_id = department.id)",
                        (err, res) => {
                            if (err) throw err;
                            var rolesList = [];
                            for (let i = 0; i < res.length; i++) {
                                console.log(res[i]);
                                rolesList.push({
                                    name: res[i].Title,
                                    value: res[i].ID
                                });
                            }
                            resolve(rolesList);
                        }
                    );
                })
            },
        },
    ]
    )
        .then(function (answer) {



            connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    manager_id: answer.manager_id,
                    roles_id: answer.roles,
                },
                function (err) {
                    if (err) throw err;
                    console.log("new employee was added");
                    runCompanyApp();
                }
            );
        });
};

const addRole = () => {
    connection.query(
        "SELECT name, id FROM department", (err, res) => {
            if (err) throw (err);
            let departmentArray = [];
            for (let d = 0; d <= res.length; d++) {
                let department = res[d]
                if (department) {
                    let departmentObject = {
                        name: department.name,
                        value: department.id
                    }
                    departmentArray.push(departmentObject);
                }
            };
            inquirer.prompt(
                [
                    {
                        type: "input",
                        name: "title",
                        message: "what is the role?"
                    },
                    {
                        type: "input",
                        name: "salary",
                        message: "what is the salary?"
                    },
                    {
                        type: "list",
                        name: "department",
                        message: "what department will this role be added under?",
                        choices: departmentArray
                    },
                ]
            )
                .then((response) => {
                    connection.query(
                        "INSERT INTO roles SET ?",
                        {
                            title: response.title,
                            salary: response.salary,
                            department_id: response.department,
                        },
                        function (err) {
                            if (err) throw err;
                            console.log("new role was added");
                            runCompanyApp();
                        }
                    );
                });
        }
    );
};

const updateEmployeeRole = () => {
    connection.query(

    )
}
