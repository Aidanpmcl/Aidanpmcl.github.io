// Question 1
const workers = [
    { firstName: "Sam", department: "Tech", designation: "Manager", salary: 40000, raiseEligible: true },
    { firstName: "Mary", department: "Finance", designation: "Trainee", salary: 18500, raiseEligible: true },
    { firstName: "Bill", department: "HR", designation: "Executive", salary: 21200, raiseEligible: false }
];

// Question 2
const company = { CompanyName: "Tech Stars", Website: "www.techstars.site", employees: workers };

// Question 3
company.employees.push({ firstName: "Anna", department: "Tech", designation: "Executive", salary: 25600, raiseEligible: false });

// Question 4
let totalSalary = 0;
for (let i = 0; i < company.employees.length; i++) {
    totalSalary += company.employees[i].salary;
}

// Question 5
function raise() {
    for (let i = 0; i < company.employees.length; i++) {
        if (company.employees[i].raiseEligible) {
            company.employees[i].salary *= 1.1;
            company.employees[i].raiseEligible = false;
        }
    }
}
raise();

// Question 6
const employeesWithWFH = ["Anna", "Sam"];
for (let i = 0; i < company.employees.length; i++) {
    company.employees[i].wfh = employeesWithWFH.includes(company.employees[i].firstName);
}

// Logging
console.log("Question 1");
console.log(workers);
console.log("Question 2");
console.log(company);
console.log("Question 3");
console.log(company.employees);
console.log("Question 4");
console.log(totalSalary);
console.log("Question 5");
console.log(company.employees);
console.log("Question 6");
console.log(company.employees);

  