const inquirer = require('inquirer');
//Import mysql2

//Import console.table for adding data into table
const cTable = require('console.table');
const Database = require('./db.js');




//Connect to database
const db = new Database()


const question =
{
    type: 'list',
    message: 'What would you like to do?',
    choices: ['View All Employees', 'Add Employee', 'Quit'],
    name: 'Action',
}
let quit = false;
function converttoChoices(names) {
    let choices = [];
    for (let i = 0; i < names.length; i++) {
        let choice = {
            name: names[i],
            value: i + 1
        }
        choices.push(choice);
    }

    return choices;
}

function getAddEmployeeQuestions() {
    return db.getRoles().then(roles => {

        return db.getManagers().then(managers => {


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
                    choices: converttoChoices(roles)
                },
                {
                    type: 'list',
                    message: "Who is the employee's manager?",
                    name: 'managerID',
                    choices: converttoChoices(managers)
                }
            ]
        })
    }
    )
}
function addEmployee() {
    // return inquirer.prompt(getAddEmployeeQuestions())
    return getAddEmployeeQuestions().then(questions => {
        return inquirer.prompt(questions)
    })
};

function promptQuestion() {
    return inquirer.prompt(question).then(({ Action }) => {
        if (Action === 'Add Employee') {

            return addEmployee().then(({ firstName, lastName, roleID, managerID }) => {
                db.insertEmployee(firstName, lastName, roleID, managerID)
                    .then(result => {
                        return promptQuestion()
                    })
            })

        }
        else if (Action === 'View All Employees') {
            return db.viewEmployees().then((result => {
                console.table(result);
            }));

        }
        else if (Action !== 'Quit') {
            return promptQuestion();
        }
      
        return Action;
    })
}
promptQuestion();





// db.query(`SELECT * FROM employee`, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });

