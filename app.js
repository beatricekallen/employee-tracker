const { prompt } = require("inquirer");
const {
  findAllDepartments,
  findAllRoles,
  findAllEmployees,
  createDepartment,
  createRole,
  createEmployee,
  editEmployeeRole,
} = require("./index");
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

  viewAllDepartments();
}

async function addRole() {
  const [departmentRows] = await findAllDepartments();

  const choices = departmentRows.map((department) => ({
    name: department.name,
    value: department.id,
  }));

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
      type: "list",
      name: "choice",
      message: "What is the department this role is in?",
      choices,
    },
  ]);
  const salaryInt = parseInt(response.salary);

  const [createRoleRows] = await createRole(
    response.title,
    salaryInt,
    response.choice
  );
  console.log("Role added.\n");

  viewAllRoles();
}

async function addEmployee() {
  const [employeeRows] = await findAllEmployees();

  const employeeChoices = employeeRows.map((employee) => ({
    name: `${employee.first_name} ${employee.last_name}`,
    value: employee.id,
  }));

  const [roleRows] = await findAllRoles();

  const roleChoices = roleRows.map((role) => ({
    name: role.title,
    value: role.id,
  }));

  const { firstName, lastName, roleChoice, employeeChoice } = await prompt([
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
      type: "list",
      name: "roleChoice",
      message: "What is the job title of the employee you'd like to add?",
      choices: roleChoices,
    },
    {
      type: "list",
      name: "employeeChoice",
      message: "Who is the manager of the employee you'd like to add?",
      choices: employeeChoices,
    },
  ]);

  createEmployee(firstName, lastName, roleChoice, employeeChoice);
  console.log("Employee added.\n");
  viewAllEmployees();
}

async function updateEmployeeRole() {
  const [employeeRows] = await findAllEmployees();

  const employeeChoices = employeeRows.map((employee) => ({
    name: `${employee.first_name} ${employee.last_name}`,
    value: employee.id,
  }));

  const [roleRows] = await findAllRoles();

  const roleChoices = roleRows.map((role) => ({
    name: role.title,
    value: role.id,
  }));

  const { employeeChoice, roleChoice } = await prompt([
    {
      type: "list",
      name: "employeeChoice",
      message:
        "What is the name of the employee whose role you'd like to update?",
      choices: employeeChoices,
    },
    {
      type: "list",
      name: "roleChoice",
      message: "What is the new role for this employee?",
      choices: roleChoices,
    },
  ]);
  editEmployeeRole(roleChoice, employeeChoice);
  console.log("Employee role updated.\n");
  viewAllEmployees();
}

function quit() {
  console.log("Goodbye!");
  process.exit();
}

mainMenu();
