const inquirer = require('inquirer');
//Import mysql2
const mysql = require('mysql2');
//Import console.table for adding data into table
const consoleTable = require('console.table');





//Connect to database

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'et_db'
    },
    console.log(`Connected to the et_db database.`)
);

const question =
{
    type: 'list',
    message: 'What would you like to do?',
    choices: ['View All Employees', 'Add Employee', 'Quit'],
    name: 'Action',
}
let quit = false;
function getRoles() {
    return db.promise().query(`SELECT * FROM roles`);

}
function getAddEmployeeQuestions() {
 return getRoles().then(roles => { 
    console.log(roles);
    return [
    {
        type: 'input',
        message: "What is employee's first name?",
        name: 'firstName'
    },
    {
        type: 'input',
        message: "What is employee's last name?",
        name: 'lastName'
    },
    {
        type: 'list',
        message: "What is employee's role?",
        name: 'roleID',
        choices: roles
    },
    {
        type: 'list',
        message: "Who is the employee's manager?",
        name: 'manager',
        choices: manager
    }
] }
) }
function addEmployee() {
    return inquirer.prompt(getAddEmployeeQuestions())
};

function promptQuestion() {
    return inquirer.prompt(question).then(({ Action }) => {
        if (Action === 'Add Employee') {
            let query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
            addEmployee().then(({firstName, lastName, roleID, managerID}) => {
                db.query(query, [firstName, lastName, roleID, managerID], (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(result);
                    
                })
            })
            
        }
        if (Action !== 'Quit') {
            return promptQuestion();
        }
        return Action;
    })
}
promptQuestion().then(({ Action }) => {
    console.log('Done')
})




// db.query(`SELECT * FROM employee`, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });

