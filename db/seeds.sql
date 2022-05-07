USE employees_db;

-- need to seed departments table
INSERT INTO department (name)
VALUES
("Accounting"),
("HR"),
("Marketing");

-- need to seed roles table
INSERT INTO role (title, salary, department_id)
VALUES
("Accountant", 60000, 1),
("Graphic designer", 55000, 3),
("HR director", 85000, 2);

-- need to seed employees table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jane", "Smith", 1, null),
("John", "Smith", 2, 1),
("Emily", "Smith", 3, null);
