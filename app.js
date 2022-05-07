const db = require("./connection");

async function findAllDepartments() {
  return db.query("SELECT * FROM department;");
}

async function findAllRoles() {
  return db.query(
    "SELECT role.id, role.title, role.salary, department.name, role.department_id FROM role LEFT JOIN department ON role.department_id = department.id;"
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

async function createRole(title, salary, department_id) {
  return db.query(
    "INSERT INTO ROLE (title, salary, department_id) VALUES (?, ?, ?);",
    [title, salary, department_id]
  );
}

async function createEmployee(firstName, lastName, role, manager) {
  return db.query(
    "INSERT INTO EMPLOYEE (first_name, last_name) VALUES (?, ?);",
    [firstName, lastName]
  );
}

async function editEmployeeRole(roleId, employeeId) {
  return db.query("UPDATE EMPLOYEE SET role_id = ? WHERE id = ?;", [
    roleId,
    employeeId,
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
