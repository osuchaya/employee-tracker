const inquirer = require("inquirer");
//Import mysql2

//Import console.table for adding data into table
const cTable = require("console.table");
const Database = require("./db.js");

//Connect to database
const db = new Database();

const question = {
  type: "list",
  message: "What would you like to do?",
  choices: [
    "View All Employees",
    "View All Departments",
    "View All Roles",
    "Update Employee Role",
    "Add Employee",
    "Add Department",
    "Add A Role",
    "Quit",
  ],
  name: "Action",
};
let quit = false;
function converttoChoices(names) {
  let choices = [];
  for (let i = 0; i < names.length; i++) {
    let choice = {
      name: names[i],
      value: i + 1,
    };
    choices.push(choice);
  }

  return choices;
}

function getAddEmployeeQuestions() {
  return db.getRoles().then((roles) => {
    return db.getManagers().then((managers) => {
      return [
        {
          type: "input",
          message: "What is employee's first name?",
          name: "firstName",
        },
        {
          type: "input",
          message: "What is employee's last name?",
          name: "lastName",
        },
        {
          type: "list",
          message: "What is employee's role?",
          name: "roleID",
          choices: converttoChoices(roles),
        },
        {
          type: "list",
          message: "Who is the employee's manager?",
          name: "managerID",
          choices: converttoChoices(managers),
        },
      ];
    });
  });
}

const departmentQuestion = {
  type: "input",
  message: "What is the name of the department?",
  name: "name",
};
function getRoleQuestions() {
  return db.getDepartments().then((departments) => {
    return [
      {
        type: "input",
        message: "What is the name of the role?",
        name: "role",
      },
      {
        type: "number",
        message: "What is the salary for the role?",
        name: "salary",
      },
      {
        type: "list",
        message: "What is the department the role is in?",
        choices: converttoChoices(departments),
        name: "department_id",
      },
    ];
  });
}
function getUpdateEmployeeQuestions() {
  return db.getEmployees().then((employees) => {
    return db.getRoles().then((roles) => {
      return [
        {
          type: "list",
          message: "Which employee's role do you want to update?",
          choices: converttoChoices(employees),
          name: "employee"
        },
        {
            type: "list",
            message: "Which role do you want to assign the selected employee?",
            choices: converttoChoices(roles),
            name: "role"
        }
      ];
    });
  });
}
function promptQuestion() {
  return inquirer.prompt(question).then(({ Action }) => {
    if (Action === "Add Employee") {
      return getAddEmployeeQuestions()
        .then((questions) => {
          return inquirer.prompt(questions);
        })
        .then(({ firstName, lastName, roleID, managerID }) => {
          db.insertEmployee(firstName, lastName, roleID, managerID).then(
            (result) => {
              return promptQuestion();
            }
          );
        });
    } else if (Action === "Add Department") {
      return inquirer.prompt(departmentQuestion).then(({ name }) => {
        db.insertDepartment(name).then((result) => {
          return promptQuestion();
        });
      });
    } else if (Action === "Add A Role") {
      return getRoleQuestions()
        .then((questions) => {
          return inquirer.prompt(questions);
        })
        .then(({ role, salary, department_id }) => {
          db.insertRole(role, salary, department_id).then((result) => {
            return promptQuestion();
          });
        });
    } else if (Action === "Update Employee Role") {
        return getUpdateEmployeeQuestions()
        .then((questions) => {
            return inquirer.prompt(questions);
        })
        .then(({ employee, role }) => {
            db.updateEmployeeRole(employee, role).then((result) => {
                return promptQuestion();
            });
        });
    }
    else if (Action === "View All Employees") {
      return db.viewEmployees().then((result) => {
        console.table(result);
        return promptQuestion();
      });
    } else if (Action === "View All Departments") {
      return db.viewDepartment().then((result) => {
        console.table(result);
        return promptQuestion();
      });
    } else if (Action === "View All Roles") {
      return db.viewRoles().then((result) => {
        console.table(result);
        return promptQuestion();
      });
    } else if (Action !== "Quit") {
      return promptQuestion();
    }

    return Action;
  });
}
promptQuestion();


