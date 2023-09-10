const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// create array to store team members
const teamArr = []

// function to gather information about team members

const gatherTeamInfo = () => {
    // prompt for Team Manager's info
    inquirer.prompt([
        {
            type: 'input',
            name: 'mgrName',
            message: "Enter the team manager's name:"
        },
        {
            type: 'input',
            name: 'mgrId',
            message: "Enter manager's ID:"
        },
        {
            type: 'input',
            name: 'mgrEmail',
            message: "Enter manager's email address:"
        },
        {
            type: 'input',
            name: 'mgrOfficeNumber',
            message: "Enter manager's office number:"
        },
    ])
    .then((answers) => {
        const manager = new Manager(
            answers.mgrName,
            answers.mgrId,
            answers.mgrEmail,
            answers.mgrOfficeNumber
        );
        teamArr.push(manager);
        // continue to gather info
        addTeamMember()

    })
}

// Function to add more team members or generate HTML
const addTeamMember = () => {
    // Prompt for choosing the type of team member to add
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'teamMemberType',
          message: 'Select the type of team member to add:',
          choices: ['Engineer', 'Intern', 'Finish building the team'],
        },
      ])
      .then((answers) => {
        if (answers.teamMemberType === 'Engineer') {
          addEngineer();
        } else if (answers.teamMemberType === 'Intern') {
          addIntern();
        } else {
          generateHTML();
        }
      });
  };
  
  // Function to add an Engineer
  const addEngineer = () => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'engrName',
          message: "Enter the engineer's name:",
        },
        {
          type: 'input',
          name: 'engrId',
          message: "Enter the engineer's employee ID:",
        },
        {
          type: 'input',
          name: 'engrEmail',
          message: "Enter the engineer's email address:",
        },
        {
          type: 'input',
          name: 'engrGithub',
          message: "Enter the engineer's GitHub username:",
        },
      ])
      .then((answers) => {
        const engineer = new Engineer(
          answers.engrName,
          answers.engrId,
          answers.engrEmail,
          answers.engrGithub
        );
        teamArr.push(engineer);
        // Continue gathering team information
        addTeamMember();
      });
  };
  
  // Function to add an Intern
  const addIntern = () => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'internName',
          message: "Enter the intern's name:",
        },
        {
          type: 'input',
          name: 'internId',
          message: "Enter the intern's employee ID:",
        },
        {
          type: 'input',
          name: 'internEmail',
          message: "Enter the intern's email address:",
        },
        {
          type: 'input',
          name: 'internSchool',
          message: "Enter the intern's school:",
        },
      ])
      .then((answers) => {
        const intern = new Intern(
          answers.internName,
          answers.internId,
          answers.internEmail,
          answers.internSchool
        );
        teamArr.push(intern);
        // Continue gathering team information
        addTeamMember();
      });
  };
  
  // Function to generate HTML and write it to the 'team.html' file
  const generateHTML = () => {
    const html = render(teamArr);
    // Check if the 'output' folder exists and create it if not
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }
    // Write the 'html' variable to the 'team.html' file
    fs.writeFile(outputPath, html, (err) => {
      if (err) throw err;
      console.log('HTML file has been generated successfully.');
    });
  };
  
  // Start gathering team information
  gatherTeamInfo();
  // TODO: Write Code to gather information about the development team members, and render the HTML file.
  
  