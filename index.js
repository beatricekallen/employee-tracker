const { prompt } = require("inquirer");
const {
  findAllDepartments,
  findAllRoles,
  findAllEmployees,
  createDepartment,
  createRole,
  createEmployee,
  editEmployeeRole,
} = require("./app");
const cTable = require("console.table");

// reprint menu after each operation, use console.table to display tables, ability to quit out of app needs to be in menu
async function mainMenu() {
  const response = await prompt({
    type: "list",
    name: "choice",
    message: "What would you like to do?",
    choices: [
      {
        name: "View all departments",
        value: "VIEW_DEPARTMENTS",
      },
      {
        name: "View all roles",
        value: "VIEW_ROLES",
      },
      {
        name: "View all employees",
        value: "VIEW_EMPLOYEES",
      },
      {
        name: "Add a department",
        value: "ADD_A_DEPARTMENT",
      },
      {
        name: "Add a role",
        value: "ADD_A_ROLE",
      },
      {
        name: "Add an employee",
        value: "ADD_AN_EMPLOYEE",
      },
      {
        name: "Update an employee role",
        value: "UPDATE_AN_EMPLOYEE_ROLE",
      },
      {
        name: "Exit",
        value: "EXIT",
      },
    ],
  });

  const choice = response.choice;

  switch (choice) {
    case "VIEW_DEPARTMENTS":
      return viewAllDepartments();
    case "VIEW_ROLES":
      return viewAllRoles();
    case "VIEW_EMPLOYEES":
      return viewAllEmployees();
    case "ADD_A_DEPARTMENT":
      return addDepartment();
    case "ADD_A_ROLE":
      return addRole();
    case "ADD_AN_EMPLOYEE":
      return addEmployee();
    case "UPDATE_AN_EMPLOYEE_ROLE":
      return updateEmployeeRole();
    case "EXIT":
      return quit();
  }
}

async function viewAllDepartments() {
  const [rows] = await findAllDepartments();
  const departments = rows;

  console.table(departments);

  mainMenu();
}

async function viewAllRoles() {
  const [rows] = await findAllRoles();
  const roles = rows;

  console.table(rows);
  mainMenu();
}

async function viewAllEmployees() {
  const [rows] = await findAllEmployees();
  const employees = rows;

  console.table(employees);

  mainMenu();
}

async function addDepartment() {
  const response = await prompt([
    {
      type: "input",
      name: "department",
      message: "What is the name of the department you'd like to add?",
    },
  ]);

  const createDepartmentRows = await createDepartment(response.department);

  console.log("Department added.\n");

  const [departmentRows] = await findAllDepartments();

  console.table(departmentRows);
  mainMenu();
}

async function addRole() {
  const response = await prompt([
    {
      type: "input",
      name: "title",
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
  const salaryInt = parseInt(response.salary);
  console.log(response.title, salaryInt, response.department);

  const [createRoleRows] = await createRole(
    response.title,
    salaryInt,
    response.department
  );
  console.log("Role added.\n");

  const [roleRows] = await findAllRoles();

  console.table(roleRows);
  mainMenu();
}

async function addEmployee() {
  const response = await prompt([
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

  createEmployee(
    response.firstName,
    response.lastName,
    response.jobTitle,
    response.manager
  );
  console.log("Employee added.\n");
  const [employeeRows] = await findAllEmployees();
  console.table(employeeRows);
  mainMenu();
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
  console.log("Employee role updated.\n");
  const [employeeRows] = await findAllEmployees();
  console.table(employeeRows);
  mainMenu();
}

function quit() {
  console.log("Goodbye!");
  process.exit();
}

mainMenu();
