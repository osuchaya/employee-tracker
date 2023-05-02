# employee-tracker
Since this is not a deployed site, please view the walkthrough video at https://drive.google.com/file/d/1VGWKndV-b9urjeHDksGBb7F6yVBawig5/view

Please see the repository where this project is lcoated at https://github.com/osuchaya/employee-tracker

## Code source
No starter code was given. This application was built from scratch.

## Technology Used
| Technology Used         | Resource URL           | 
| ------------- |:-------------:| 
| Node.js    | [https://nodejs.org](https://nodejs.org) | 
| npm inquirer | [https://www.npmjs.com/package/inquirer/v/8.2.4](https://www.npmjs.com/package/inquirer/v/8.2.4) |
| JavaScript | [https://developer.mozilla.org/en-US/docs/Web/JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) |
| Console Table |[https://www.npmjs.com/package/console.table]|(https://www.npmjs.com/package/console.table)|
| MySQL2 |[https://www.npmjs.com/package/mysql2]|(https://www.npmjs.com/package/mysql2)|

## Description
This project is part of Module 12 on MySQL where the author used Command Line Interface (CLI) as part of Node.js, Inquirer package, Console Table package and MySQL2 to generate an example of database handling application called Employee Tracker. Users can use MySQL shell and Node.js CLI to run the application to view employees in the database, update the database with new employees 


## Installation
Install Node version 16.0 in order to run this application successfully. Please ensure to install as part of npm packages: inquirer package version 8.2.4, Console table and MySQL2. Upon successful installation, run the app by typing 'node index.js' (as index.js is the main file) or alternative type 'npm run start' in Integrated Terminal. Initialize the database by doing the following in integrated terminal: 
1. Type mysql -u root -p
2. Type in your password for MySQL
3. Type USE et_db;
4. Type SOURCE schema.sql;
5. Type SOURCE seeds.sql;
6. Type Quit;
7. Type in integrated terminal 'npm run start' or 'node index.js'

Follow the prompt to use this Employee Tracker App.

## Usage
After cloning the code files into your local machine, run the application in your terminal by typing 'run node index.js'. This will initiate prompts to select options. Users can choose which option they would like to application to do.

## License
This project is currently under GPL3.0 license.

## Learning points
The author has implemented what is learnt from module 12 MySQL wherein this application, 
MySQL Shell is used to execute commands, creating a database schema and seeding and conecting to the database for developing the application Employee-Tracker. In this application, MySQL commands were used to perform basic CRUD operations and join tables together. Prepared statements were also used to sanitize codes in conjunction with basic functions like INSERT and UPDATE database.

## Credits
Resources were consulted to complete this application such as the documentations on how to join SQL table and different types of join, how to debug from Stack Overflow community, npm documents on console table and other related documents. See links below:

https://www.w3schools.com/sql/func_mysql_concat.asp
https://database.guide/join-3-tables-in-sql/
https://forum.freecodecamp.org/t/push-new-element-into-array-using-for-loop/225401
https://www.w3schools.com/sql/sql_join.asp
https://www.w3schools.com/sql/trysql.asp?filename=trysql_select_join
https://stackoverflow.com/questions/1346209/unknown-column-in-field-list-error-on-mysql-update-query
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
https://www.sqlservertutorial.net/sql-server-basics/sql-server-joins/
https://developer.mozilla.org/en-US/docs/Glossary/SQL_Injection


