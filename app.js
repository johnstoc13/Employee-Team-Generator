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
    promptQuestions("manager").then((manager) => {
        // Create new variable for manager and info
        const newManager = new Manager(manager.name, manager.id, manager.email, manager.office);
        // Add manager into employees array
        employees.push(newManager);
        // Push other entries into appropriate arrays for validation
        questions.ids.push(manager.id);
        questions.emails.push(manager.email);
        questions.offices.push(manager.office);
        // Call for new employee function
        addNewEmployee();
    });
};

const addNewEmployee = () => {
    // Prompt for question containing employee choices
    promptQuestions("question").then((result) => {
        if (result.question === "Intern") {
            // Prompt for intern specific questions
            promptQuestions("intern").then((intern) => {
                // Same process here as for manager
                const newIntern = new Intern(intern.name, intern.id, intern.email, intern.school);
                employees.push(newIntern);
                questions.ids.push(intern.id);
                questions.emails.push(intern.email);
                addNewEmployee();
            });
        } else if (result.question === "Engineer") {
            promptQuestions("engineer").then((engineer) => {
                // Same process here for engineer as intern
                const newEngineer = new Engineer(engineer.name, engineer.id, engineer.email, engineer.github);
                employees.push(newEngineer);
                questions.ids.push(engineer.id);
                questions.emails.push(engineer.email);
                questions.githubs.push(engineer.github);
                addNewEmployee();
            });
        } else {
            // Message to end inputs
            console.log("Employee additions complete!");
            // Variable containing the rendered HTML page
            const employeesPage = render(employees);
            createOutput(employeesPage);
        }
    });
};

startGenerator();

// Credit:  https://www.geeksforgeeks.org/node-js-fs-existssync-method/
// Credit:  https://www.geeksforgeeks.org/node-js-fs-mkdirsync-method/
// let fileExists = fs.existsSync("./output");

// Function to create Output folder and HTML file if nonexistent
// const createOutput = (html) => {
//     if (!fileExists) {
//         console.log("Creating output file.")
//         fs.mkdirSync(OUTPUT_DIR);
//     }
//     fs.writeFileSync(outputPath, html);
// };


// Refactored function to run asynchronously
// Credit:  Worked with tutor here!
const createOutput = (html) => {
    // Check for output folder
    fs.exists("./output", (exists) => {
        if (!exists) {
            console.log("Creating output folder.");
            fs.mkdir(OUTPUT_DIR, { recursive: true }, (err) => {
                if (err) {
                    return console.log(err);
                }
                fs.writeFile(outputPath, html, (err) => {
                    if (err) {
                        return console.log(err);
                    }
                    return console.log("File created successfully!");
                });
            });
        }
        fs.writeFile(outputPath, html, (err) => {
            if (err) {
                return console.log(err);
            }
            return console.log("File created successfully!");
        });
    });
};