const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require("mysql2");
const cTable = require("console.table");

const db = require("./connection");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

async function findAllDepartments() {
  return db.query("SELECT * FROM departments;");
}

async function findAllRoles() {
  return db.query(
    "SELECT roles.id, roles.title, roles.salary, departments.id FROM roles LEFT JOIN departments WHERE roles.department_id = departments.id;"
  );
}

async function findAllEmployees() {
  return db.query(
    "SELECT employees.id, employees.first_name, employees.last_name, employees.role_id, employees.manager_id FROM employees LEFT JOIN roles WHERE employees.role_id = roles.id;"
  );
}

async function createDepartment(department) {
  return db.query("INSERT INTO departments SET ?", department);
}

async function createRole(role) {
  return db.query("INSERT INTO roles SET ?", role);
}

async function createEmployee(employee) {
  return db.query("INSERT INTO employees SET ?", employee);
}

async function editEmployeeRole(employee, role) {
  return db.query("UPDATE employees SET ? WHERE employee = ?", employee, role);
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
