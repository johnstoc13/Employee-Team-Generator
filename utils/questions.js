// Empty arrays to check for duplication
const ids = [];
const emails = [];
const offices = [];
const githubs = [];

// Credit:  https://www.npmjs.com/package/inquirer
// Credit:  https://stackoverflow.com/questions/35499782/how-to-accept-space-in-regex
// Validation functions
const validateName = (name) => {
    const namePattern = /^[a-zA-Z]+(?:\s[a-zA-Z]+)?$/;
    if (!name) {
        return "Please fill out all fields";
    }
    else if (!namePattern.test(name)) {
        return "Name must be letters only";
    }
    return true;
};

const validateId = (id) => {
    const idPattern = /^[0-9]{3,10}$/;
    if (!id) {
        return "Please enter an ID";
    }
	else if (ids.includes(id)) {
		return "ID already used, please enter a unique ID";
    }
    else if (!idPattern.test(id)) {
        return "ID must be 3-10 numbers in length";
    }
	return true;
};

const validateEmail = (email) => {
    const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
    if (!email) {
        return "Please enter an email";
    }
	else if (emails.includes(email)) {
		return "Email already used, please enter a unique Email";
    }
    else if (!emailPattern.test(email)) {
        return "Please enter a valid email address";
    }
	return true;
};

const validateOffice = (office) => {
    const officePattern = /^[0-9]{1,5}$/;
    if (!office) {
        return "Please enter an office number";
    }
    else if (!officePattern.test(office)) {
        return "Office number must be 1-5 numbers in length";
    }
	return true;
};

const validateSchool = (school) => {
    const schoolPattern = /^[a-zA-Z\s]+$/;
    if (!school) {
        return "Please enter a school";
    }
    else if (!schoolPattern.test(school)) {
        return "School name must be letters only";
    }
    return true;
};

const validateGithub = (github) => {
    if (!github) {
        return "Please enter a GitHub username";
    }
    else if (githubs.includes(github)) {
		return "GitHub username already used";
    }
    return true;
};

const manager = [
    {
        type: "input",
        name: "name",
        message: "What is your manager's name?",
        validate: validateName
    },
    {
        type: "input",
        name: "id",
        message: "What is your manager's id?",
        validate: validateId
    },
    {
        type: "input",
        name: "email",
        message: "What is your manager's email?",
        validate: validateEmail
    },
    {
        type: "input",
        name: "office",
        message: "What is your manager's office number?",
        validate: validateOffice
    },
];

const intern = [
    {
        type: "input",
        name: "name",
        message: "What is your intern's name?",
        validate: validateName
    },
    {
        type: "input",
        name: "id",
        message: "What is your intern's id?",
        validate: validateId
    },
    {
        type: "input",
        name: "email",
        message: "What is your intern's email?",
        validate: validateEmail
    },
    {
        type: "input",
        name: "school",
        message: "What is your intern's school?",
        validate: validateSchool
    },
];

const engineer = [
    {
        type: "input",
        name: "name",
        message: "What is your engineer's name?",
        validate: validateName
    },
    {
        type: "input",
        name: "id",
        message: "What is your engineer's id?",
        validate: validateId
    },
    {
        type: "input",
        name: "email",
        message: "What is your engineer's email?",
        validate: validateEmail
    },
    {
        type: "input",
        name: "github",
        message: "What is your engineer's Github username?",
        validate: validateGithub
    },
];

const question = [
    {
        type: "list",
        name: "question",
        message: "Which type of team member would you like to add?",
        choices: [
            "Intern",
            "Engineer",
            "I don't want to add any more team members."
        ]
    },
];

module.exports = {ids, emails, offices, githubs, manager, intern, engineer, question};