const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'Tech2015!',
    database: 'employee_tracker_db'
  },
  console.log(`Connected to the employee_tracker_db database.`)
);


const menu = () => {
  inquirer.prompt({
    message: "What would you like to do today?",
    name: "menu",
    type: "list",
    choices: [
      "View all departments",
      "View all positions",
      "View all employees",
      "Add a department",
      "Add a job position",
      "Add an employee",
      "Update employee job position",
      "Exit",
    ],
  })
    // The switch statement will execute the statement until a break or the end of the statement is executed.
    .then(response => {
      switch (response.menu) {
        case "View all departments":
          viewAllDepartments();
          break;
        case "View all positions":
          viewAllPositions();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add a department":
          AddDepartment();
          break;
        case "Add a position":
          AddPosition();
          break;
        case "Add an employee":
          AddEmployee();
          break;
        case "Add a department":
          AddDepartment();
          break;
        case "Update Employee Position":
          UpdateEmployee();
          break;
        case "Exit":
          db.end()
          break;
        default:
          db.end();
      }
    });
};

//Query database
const viewAllDepartments = () => {
  db.query('SELECT * FROM department', function (err, res) {
    if (err) throw err;
    console.log(results);
    menu();
  });
};

const viewAllPositions = () => {
  db.query("SELECT * FROM position", function (err, res) {
    if (err) throw err;
    console.log(results);
    menu();
  });
};
const viewAllEmployees  = () => {
  db.query("SELECT employee.id, first_name, last_name, title, salary, department_name, manager_id FROM ((department JOIN position ON department.id = position.department_id) JOIN employee ON position.id = employee.position.id);",
    function (err, res) {
    if (err) throw err;
    console.log(results);
    menu();
  });
};