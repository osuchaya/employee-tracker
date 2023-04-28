const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',    
      password: 'password',
      database: 'et_db'
    },
    console.log(`Connected to the et_db database.`)
  );
  

  
  
  
  db.query(`SELECT * FROM employee`,(err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });