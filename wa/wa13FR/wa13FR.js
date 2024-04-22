
// Problem 1
console.log("Problem 1");
const employees = [
    { firstName: "Sam", department: "Tech", designation: "Manager", salary: 40000, raiseEligible: true },
    { firstName: "Mary", department: "Finance", designation: "Trainee", salary: 18500, raiseEligible: true },
    { firstName: "Bill", department: "HR", designation: "Executive", salary: 21200, raiseEligible: false }
];
console.log(employees);

// Problem 2
console.log("Problem 2");
const company = {
    companyName: "Tech Stars",
    website: "www.techstars.site",
    employees: employees
};
console.log(company);

// Problem 3
console.log("Problem 3");
company.employees.push({ firstName: "Anna", department: "Tech", designation: "Executive", salary: 25600, raiseEligible: false });
console.log(company);

// Problem 4
console.log("Problem 4");
let totalSalary = 0;
for (let i = 0; i < company.employees.length; i++) {
    totalSalary += company.employees[i].salary;
}
console.log("Total Salary:", totalSalary);



// Problem 5
console.log("Problem 5");
function giveRaise(company) {
    for (let i = 0; i < company.employees.length; i++) {
        if (company.employees[i].raiseEligible) {
            company.employees[i].salary *= 1.1;
            company.employees[i].raiseEligible = false;
        }
    }
}
giveRaise(company);
console.log(company);



// Problem 6
console.log("Problem 6");
const homeEmployees = ["Anna", "Sam"];
for (let i = 0; i < company.employees.length; i++) {
    company.employees[i].wfh = homeEmployees.includes(company.employees[i].firstName);
}
console.log(company);
