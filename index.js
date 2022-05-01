const { prompt } = require("inquirer");
const {
  findAllDepartments,
  findAllRoles,
  findAllEmployees,
  createDepartment,
  createRole,
  createEmployee,
  editEmployeeRole,
} = require("./server");
const cTable = require("console.table");

// reprint menu after each operation, use console.table to display tables, ability to quit out of app needs to be in menu
async function mainMenu() {
  const response = await prompt({
    type: "list",
    name: "managerName",
    message: "What would you like to do?",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
      "Exit",
    ],
  });
  switch (response) {
    case "View all departments":
      return viewAllDepartments();
    case "View all roles":
      return viewAllRoles();
    case "View all employees":
      return viewAllEmployees();
    case "Add a department":
      return addDepartment();
    case "Add a role":
      return addRole();
    case "Add an employee":
      return addEmployee;
    case "Update an employee role":
      return updateEmployeeRole();
    case "Exit":
      return quit();
  }
}

async function viewAllDepartments() {
  const [rows] = await findAllDepartments();
  const departments = rows;

  departments.forEach((department) => {
    console.table(department.department_name);
  });
}

async function viewAllRoles() {
  const [rows] = await findAllRoles();
  const roles = rows;

  roles.forEach((role) => {
    console.table(role.job_title, role.department, role.salary);
  });
}

async function viewAllEmployees() {
  const [rows] = await findAllEmployees();
  const employees = rows;

  employees.forEach((employee) => {
    console.table(
      employee.first_name,
      employee.last_name,
      employee.job_title,
      employee.department,
      employee.salary,
      employee.manager
    );
  });
}

async function addDepartment() {
  const response = await prompt([
    {
      type: "input",
      name: "department",
      message: "What is the name of the department you'd like to add?",
    },
  ]);

  const [createDepartmentRows] = await createDepartment(response);
  console.log("Department added.");
  console.table(findAllDepartments());
}

async function addRole() {
  const response = await prompt([
    {
      type: "input",
      name: "role",
      message: "What is the name of the role you'd like to add?",
    },
    {
      type: "input",
      name: "salary",
      message: "What is the salary for the role you'd like to add?",
    },
    {
      type: "input",
      name: "department",
      message: "What is the department of the role you'd like to add?",
    },
  ]);

  const [createRoleRows] = await createRole(response);
  console.log("Role added.");
  console.table(findAllRoles());
}

async function addEmployee() {
  const { first_name, last_name, job_title, manager } = await prompt([
    {
      type: "input",
      name: "firstName",
      message: "What is the first name of the employee you'd like to add?",
    },
    {
      type: "input",
      name: "lastName",
      message: "What is the last name of the employee you'd like to add?",
    },
    {
      type: "input",
      name: "jobTitle",
      message: "What is the job title of the employee you'd like to add?",
    },
    {
      type: "input",
      name: "manager",
      message: "Who is the manager of the employee you'd like to add?",
    },
  ]);
  createEmployee(first_name, last_name, job_title, manager);
  console.log("Employee added.");
  console.table(findAllEmployees());
}

async function updateEmployeeRole() {
  const { first_name, last_name, job_title } = await prompt([
    {
      type: "input",
      name: "firstName",
      message:
        "What is the first name of the employee whose role you'd like to update?",
    },
    {
      type: "input",
      name: "lastName",
      message:
        "What is the last name of the employee whose role you'd like to update?",
    },
    {
      type: "input",
      name: "role",
      message: "What is the new role for this employee?",
    },
  ]);
  editEmployeeRole(first_name, last_name, job_title);
  console.log("Employee role updated.");
  console.table(findAllEmployees());
}

function quit() {
  console.log("Goodbye!");
  process.exit();
}

mainMenu();
