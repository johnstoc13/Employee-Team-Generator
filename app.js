const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const questions = require("./utils/questions");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)


// ********* MY NOTES ****************
// 
// console.log("Please build your team")          
// Need to prompt user for manager 1st            
//     then create new manager with all info and push into array
// Then prompt for other employees from questions.js
// If intern, else if engineer, else "I don't want to add any more team members."
// Will need an array for all employee objects....   
// Need to validate info, to ensure not used before

// Prompt user for questions
const promptQuestions = (type) => {
    return inquirer.prompt(questions[type]);
};

// Start the employee team generator
const startGenerator = () => {
    console.log("Please build your team");
    promptQuestions("manager").then((employee) => {
        const newEmployee = new Manager(employee.name, employee.id, employee.email, employee.office);
        employees.push(newEmployee);
        // console.log(employees);
        addNewEmployee();
    });
};

const addNewEmployee = () => {
    promptQuestions("question").then((result) => {
        if (result.question === "Intern") {
            promptQuestions("intern").then((intern) => {
                const newIntern = new Intern(intern.name, intern.id, intern.email, intern.school);
                employees.push(newIntern);
                addNewEmployee();
            });
        } else if (result.question === "Engineer") {
            promptQuestions("engineer").then((engineer) => {
                const newEngineer = new Engineer(engineer.name, engineer.id, engineer.email, engineer.github);
                employees.push(newEngineer);
                addNewEmployee();
            });
        } else {
            console.log("Employee additions complete!");
            console.log(employees);
        }
    });
};

startGenerator();




// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
