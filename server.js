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
  return db.query("SELECT * FROM roles;");
}

async function findAllEmployees() {
  return db.query("SELECT * FROM employees;");
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
