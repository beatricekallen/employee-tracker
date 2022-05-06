const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require("mysql2");
const cTable = require("console.table");

const db = require("./connection");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

async function findAllDepartments() {
  return db.query("SELECT * FROM department;");
}

async function findAllRoles() {
  return db.query(
    "SELECT role.id, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;"
  );
}

async function findAllEmployees() {
  return db.query(
    "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id FROM employee LEFT JOIN role ON employee.role_id = role.id;"
  );
}

async function createDepartment(name) {
  return db.query("INSERT INTO DEPARTMENT (name) VALUES (?);", name);
}

async function createRole(title, salary, department) {
  return db.query(
    "INSERT INTO ROLE (title, salary) VALUES (?, ?) INTO DEPARTMENT (name) VALUE (?);",
    [title, salary, department]
  );
}
//TODO: need to work out how to add role to role table and add manager
async function createEmployee(firstName, lastName, role, manager) {
  return db.query(
    "INSERT INTO EMPLOYEE (first_name, last_name) VALUES (?, ?);",
    [firstName, lastName]
  );
}

//TODO: need to work out how to add role to role table
async function editEmployeeRole(firstName, lastName, role) {
  return db.query("UPDATE EMPLOYEE SET first_name = ? WHERE employee = ?;", [
    firstName,
    lastName,
    role,
  ]);
}

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

module.exports = {
  findAllDepartments,
  findAllRoles,
  findAllEmployees,
  createDepartment,
  createRole,
  createEmployee,
  editEmployeeRole,
};
