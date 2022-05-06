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
    //roles.title,
    "SELECT role.id, department.department_name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;"
  );
}

async function findAllEmployees() {
  return db.query(
    "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id FROM employee LEFT JOIN role ON employee.role_id = role.id;"
  );
}

async function createDepartment(name) {
  return db.query("INSERT INTO department VALUES ?;", name);
}

async function createRole(role) {
  return db.query("INSERT INTO role SET ?;", role);
}

async function createEmployee(employee) {
  return db.query("INSERT INTO employee SET ?;", employee);
}

async function editEmployeeRole(employee, role) {
  return db.query("UPDATE employee SET ? WHERE employee = ?;", [
    first_name,
    last_name,
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
