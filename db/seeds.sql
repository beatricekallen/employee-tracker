USE employees_db

-- need to seed departments table
INSERT INTO departments (department_name)
VALUES
("Accounting"),
("HR"),
("Marketing");

-- need to seed roles table
INSERT INTO roles (title, salary)
VALUES
("Accountant", 60000),
("Graphic designer", 55000),
("HR director", 85000);

-- need to seed employees table
INSERT INTO employees (first_name, last_name)
VALUES ("Jane", "Smith");
