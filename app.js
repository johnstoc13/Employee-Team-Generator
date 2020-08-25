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

// Prompt user for questions
const promptQuestions = (type) => {
    return inquirer.prompt(questions[type]);
};

// Start the employee team generator
const startGenerator = () => {
    // Initial display message
    console.log("Please build your team");
    // Prompt manager questions
    promptQuestions("manager").then((employee) => {
        // First verify all entries were completed
        if (!employee.name || ! employee.id || !employee.email || !employee.office) {
            console.log("You must enter all of your Manager's information!");
        } else {
            // Create new variable for manager and info
            const newEmployee = new Manager(employee.name, employee.id, employee.email, employee.office);
            // Add manager into employees array
            employees.push(newEmployee);
            // Call for new employee function
            addNewEmployee();
        }
    });
};

const addNewEmployee = () => {
    // Prompt for question containing employee choices
    promptQuestions("question").then((result) => {
        if (result.question === "Intern") {
            // Prompt for intern specific questions
            promptQuestions("intern").then((intern) => {
                // Validate all entries completed
                if (!intern.name || !intern.id || !intern.email || !intern.school) {
                    console.log("You must enter all of your Intern's information!");
                    // Verify id isn't same as manager
                } else if (intern.id == employees[0].id) {
                    console.log("Intern cannot have the same ID as the Manager!");
                    // Verify email isn't same as manager
                } else if (intern.email == employees[0].email) {
                    console.log("Intern cannot have the same email as the Manager!");
                } else {
                    // Same process here as for manager
                    const newIntern = new Intern(intern.name, intern.id, intern.email, intern.school);
                    employees.push(newIntern);
                    addNewEmployee();
                }
            });
            // Same process for engineer as intern
        } else if (result.question === "Engineer") {
            promptQuestions("engineer").then((engineer) => {
                if (!engineer.name || !engineer.id || !engineer.email || !engineer.school) {
                    console.log("You must enter all of your Engineer's information!");
                } else if (engineer.id == employees[0].id) {
                    console.log("Engineer cannot have the same ID as the Manager!");
                } else if (engineer.email == employees[0].email) {
                    console.log("Engineer cannot have the same email as the Manager!");
                } else {
                const newEngineer = new Engineer(engineer.name, engineer.id, engineer.email, engineer.github);
                employees.push(newEngineer);
                addNewEmployee();
                }
            });
        } else {
            // Message to end inputs
            console.log("Employee additions complete!");
            // Variable containing the rendered HTML page
            const employeesPage = render(employees);
            // console.log(employeesPage);     ****CAN REMOVE LATER****
            createOutput();

        }
    });
};

startGenerator();



// Credit:  https://www.geeksforgeeks.org/node-js-fs-existssync-method/
// Credit:  https://www.geeksforgeeks.org/node-js-fs-mkdirsync-method/
let fileExists = fs.existsSync("./output");

const createOutput = () => {
    if (!fileExists) {
        console.log("Creating output file.")
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath);
}

// ***********          NEW NOTES        ********************
// Need a function to check whether file exists, and if not, create one
// Needs to happen after 
// Need to create both output and team.html files this way

// REFERENCE FROM ABOVE to folder and
// const OUTPUT_DIR = path.resolve(__dirname, "output");
// const outputPath = path.join(OUTPUT_DIR, "team.html");




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
