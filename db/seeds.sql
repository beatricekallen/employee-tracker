USE employees_db;

-- need to seed departments table
INSERT INTO department (name)
VALUES
("Accounting"),
("HR"),
("Marketing");

-- need to seed roles table
INSERT INTO role (title, salary)
VALUES
("Accountant", 60000),
("Graphic designer", 55000),
("HR director", 85000);

-- need to seed employees table
INSERT INTO employee (first_name, last_name)
VALUES ("Jane", "Smith");
