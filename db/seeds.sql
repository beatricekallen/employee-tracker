USE employees_db

-- need to seed departments table
INSERT INTO departments (department_name)
VALUES
("Accounting"),
("HR"),
("Marketing");

-- need to seed roles table
INSERT INTO roles (job_title, department, salary)
VALUES
("Accountant", "Accounting", 60000),
("Graphic designer", "Marketing", 55000),
("HR director", "HR", 85000);

-- need to seed employees table
INSERT INTO employees (first_name, last_name, job_title, department, salary, manager)
VALUES ("Jane", "Smith", "Market analyst", "Marketing", 68000, "Rose Smith");
