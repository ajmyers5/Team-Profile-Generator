const inquirer = require("inquirer");
const fs = require("fs");
const jest = require("jest");
const util = require("util");

const Employee = require("./Develop/lib/employee");
const Engineer = require("./Develop/lib/engineer");
const Manager = require("./Develop/lib/mngm");
const Intern = require("./Develop/lib/intern");

var id = 0;
const Managers = [];
const Engineers = [];
const Interns = [];

//set max listeners so a node error won't show up after a certain number of employees are added
require("events").EventEmitter.defaultMaxListeners = 9999;

//Creating the beginning of the HTML doc
const initialHtml = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" 
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <title>Team Profile Generator</title>
    <style>
        body {
          font-size: 1.5rem;
        }
        a {
          color: #000000;
          text-decoration: none;
        }
      </style>
</head>
<body style="background-color: #e0736c;">
    <h1 class="head col-12 py-4 display-1 font-weight-bold text-center" style="background-color: #ffffff; color: #255b8d";>My Team</h1>
    <div class="row px-5 mx-5 mt-5 justify-content-center">    
    `;
fs.writeFile("index.html", initialHtml, (err) => {
  if (err) throw err;
});

//Prompting users for name, position, email, office number, GHname, school and adding inputs into the arrays
var promptUserForInfo = function () {
  inquirer
    .prompt([
      {
        message: "Please enter employee name:",
        name: "employeeName",
      },
      {
        type: "list",
        message: "Please choose employee position:",
        choices: ["Manager", "Engineer", "Intern"],
        name: "position",
      },
      {
        message: "Please enter employee email:",
        name: "email",
      },
      {
        message: "Please enter office number:",
        name: "officeNumber",
        when: (answers) => answers.position === "Manager",
      },
      {
        message: "Please enter github profile name:",
        name: "github",
        when: (answers) => answers.position === "Engineer",
      },
      {
        message: "Please enter school name:",
        name: "schoolName",
        when: (answers) => answers.position === "Intern",
      },
    ])
    .then(function (answers) {
      id++;
      if (answers.position === "Manager") {
        var manager = new Manager(
          id,
          answers.employeeName,
          answers.email,
          answers.officeNumber
        );
        Managers.push(manager);
        console.log("Added new manager to employees.");
        closingprompts();
      }
      if (answers.position === "Engineer") {
        var engineer = new Engineer(
          id,
          answers.employeeName,
          answers.email,
          answers.github
        );
        Engineers.push(engineer);
        console.log("Added new engineer to employees.");
        closingprompts();
      }
      if (answers.position === "Intern") {
        var intern = new Intern(
          id,
          answers.employeeName,
          answers.email,
          answers.schoolName
        );
        Interns.push(intern);
        console.log("Added new intern to employees.");
        closingprompts();
      }
    });
};
promptUserForInfo();

//looping thru or ending dependent on user input and adds cards to the HTML
function closingprompts() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Enter additional employees?:",
        choices: ["Yes", "No"],
        name: "continue",
      },
    ])
    .then(function (answers) {
      if (answers.continue === "Yes") {
        promptUserForInfo();
      } else {
        for (i = 0; i < Managers.length; i++) {
          var newcard = `
                <div class="card p-0 m-2" style="width: 18rem;">
                    <div class="card-body" style= "background-color: #cedbe3; color: black;">
                        <h2 class="card-title text-center">${Managers[i].name}</h2>
                </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">ID: ${Managers[i].id}</li>
                        <li class="list-group-item">Email: <a href="mailto:${Managers[i].email}">${Managers[i].email}</a></li>
                        <li class="list-group-item">Office Number: ${Managers[i].officeNum}</li>
                    </ul>
                </div>`;
          fs.appendFile("index.html", newcard, (err) => {
            if (err) throw err;
            console.log("Manager was appended to html doc.");
          });
        }
        for (i = 0; i < Engineers.length; i++) {
          var newcard = `
                <div class="card p-0 m-2" style="width: 18rem;">
                    <div class="card-body" style= "background-color: #cedbe3; color: black">
                        <h2 class="card-title text-center">${Engineers[i].name}</h2>
                </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">ID: ${Engineers[i].id}</li>
                        <li class="list-group-item">Email: <a href="mailto:${Engineers[i].email}">${Engineers[i].email}</a></li>
                        <li class="list-group-item">GitHub Profile: <a href="https://github.com/${Engineers[i].github}" target="_blank">${Engineers[i].github}</a></li>
                    </ul>
                </div>`;
          fs.appendFile("index.html", newcard, (err) => {
            if (err) throw err;
            console.log("Engineer was appended to html doc.");
          });
        }
        for (i = 0; i < Interns.length; i++) {
          var newcard = `
                <div class="card p-0 m-2" style="width: 18rem;">
                    <div class="card-body" style= "background-color: #cedbe3; color: black">
                        <h2 class="card-title text-center">${Interns[i].name}</h2>
                </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">ID: ${Interns[i].id}</li>
                        <li class="list-group-item">Email: <a href="mailto:${Interns[i].email}">${Interns[i].email}</a></li>
                        <li class="list-group-item">School: ${Interns[i].school}</li>
                    </ul>
                </div>`;
          fs.appendFile("index.html", newcard, (err) => {
            if (err) throw err;
            console.log("Intern was appended to html doc.");
          });
        }
      }
    });
}
