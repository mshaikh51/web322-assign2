var employees = [];
var departments = [];
var fs = require("fs");
const { get } = require("http");
module.exports.initialize = () => {
    return new Promise((resolve, reject) => {
        getData('./data/employees.json').then(function (data) {
            employees=data;
            getData('./data/departments.json').then(function (data1) {
                departments=data1;
                resolve();
            }).catch(function () {
                reject("unable to read file");
            })

        }).catch(function () {
            reject("unable to read file");
        });
    });
}

function getData(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, (err, data) => {
            if (err) reject();
            resolve(JSON.parse(data));
        })
    }
    );
}


module.exports.getAllEmployees = function () {
    return new Promise((resolve, reject) => {
        // console.log("employees",employees);
        if (employees.length == 0) {
            reject("no results returned");
        }
        resolve(employees);
    })
}

module.exports.getManagers = function () {
    return new Promise((resolve, reject) => {
        let managers = [];
        for (i in employees) {
            if (employees[i]["isManager"] == true)
                managers.push(employees[i]);
        }
        if (managers.length == 0) {
            reject("no results returned");
        }
        resolve(managers);
    })
}

module.exports.getDepartments = function () {
    return new Promise((resolve, reject) => {
        if (departments.length == 0) {
            reject("no results returned");
        }
        resolve(departments);
    })
}
