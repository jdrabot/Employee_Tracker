USE company_DB;

INSERT INTO department (name)
VALUES ("Owners"), ("Coaches"), ("Players"),

INSERT INTO roles (title, salary, department_id)
VALUES ("Owner", 1000, 1), ("Coach", 100, 2), ("Player", 50, 3);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("Michael", "Jordan", 1, null);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("James", "Borrego", 2, 1);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("LaMelo", "Ball", 3, 2);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("Miles", "Bridges", 3, 2);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("David", "Tepper", 1, null);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("Matt", "Rhule", 2, 1);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("Christian", "McCaffrey", 3, 2);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("DJ", "Moore", 3, 2);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("Hal", "Steinbrenner", 1, null);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("Aaron", "Boone", 2, 1);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("Aaron", "Judge", 3, 2);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("Giancarlo", "Stanton", 3, 2);