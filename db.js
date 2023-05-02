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

    insertEmployee(firstName, lastName, roleID, managerID) {
        let query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        return this.db.promise().query(query, [firstName, lastName, roleID, managerID])
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
 }

module.exports = Database