const mysql = require('mysql2');

class Database {
    constructor() {
        this.db = mysql.createConnection(
            {
                host: 'localhost',
                user: 'root',
                password: 'password',
                database: 'et_db'
            },
            console.log(`Connected to the et_db database.`)
        )
    };
    getRoles() {
        return this.db.promise().query(`SELECT title FROM role`).then(result => {
          const data = result[0];
          let roles = [];
          for (let i=0; i<data.length; i++) {
            roles.push(data[i]['title']);
          }
          return roles;
        });

    }
    getManagers() {
        return this.db.promise().query(`SELECT first_name, last_name FROM employee`).then(result => {
            const data = result[0];
            let managers = [];
            for (let i=0; i<data.length; i++) {
                managers.push(data[i].first_name + " " + data[i].last_name);
            }
            return managers;
        });
    }
    getEmployees() {
        return this.getManagers();
    }
    getDepartments() {
        return this.db.promise().query( `SELECT name FROM department`).then(result => {
            const data = result[0];
            let departments = [];
            for (let i=0; i<data.length; i++) {
                departments.push(data[i]['name']);
            }
            return departments;
        })
    }

    insertEmployee(firstName, lastName, roleID, managerID) {
        let query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        return this.db.promise().query(query, [firstName, lastName, roleID, managerID])
    }
    insertDepartment(name) {
        let query = `INSERT INTO department (name) VALUE (?)`;
        return this.db.promise().query(query, [name])
    }
    insertRole(role, salary, department_id) {
        let query = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
        return this.db.promise().query(query, [role, salary, department_id])
    }
    updateEmployeeRole(employee_id, role_id) {
        let query = `UPDATE employee SET role_id=? WHERE employee.id=?`;
        return this.db.promise().query(query, [role_id, employee_id])
    }
    viewEmployees() {
        let query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary,
         CONCAT(manager.first_name," ",manager.last_name) AS manager FROM employee 
        INNER JOIN role ON employee.role_id=role.id INNER JOIN department ON department.id=role.department_id 
        LEFT JOIN employee AS manager ON employee.manager_id=manager.id`;

        return this.db.promise().query(query).then(result => {
            return result[0];
            
        })
    }
    viewDepartment() {
        let query = `SELECT id, name FROM department`;
        return this.db.promise().query(query).then(result => {
            return result[0];
        })
    }
    viewRoles() {
        let query = `SELECT role.id, title, salary, department.name AS department FROM role INNER JOIN department ON role.department_id=department.id`;
        return this.db.promise().query(query).then(result => {
            return result[0];
        })
    }

 }

module.exports = Database