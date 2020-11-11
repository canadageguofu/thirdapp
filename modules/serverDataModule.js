const { clear, Console } = require('console');
const { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } = require('constants');
const fs = require('fs');
const { resolve } = require('path');
employees = [];
departments = [];
managers = [];

class myData {
    constructor(allEmployees,allDepartments,allManagers){
        this.allemployees = allEmployees;
        this.alldepartments = allDepartments;
        this.allmanagers = allManagers;
    }
    getEmployees(){
        return this.allemployees;
    }
    getDepartments(){
        return this.alldepartments;
    }
    getManagers(){
        return this.allmanagers;
    }
    addEmp(newEmp){
        this.allemployees.push(newEmp);
    }
    addDep(newDep){
        this.alldepartments.push(newDep);
    }
    addMng(newMng){
        this.allmanagers.push(newMng);
    }

}

let allData = new myData([]);
 

module.exports.initialize = function(){
    return new Promise(function(resolve,reject){
           module.exports.readEmployees().then(module.exports.readDepartments).then(function(){
               resolve();
           }).catch((err)=>{reject("unable to read file");});
        });
}

module.exports.readEmployees = function(){
    return new Promise(function(resolve,reject){
                fs.readFile("./data/employees.json", 'utf8', (err, data) => {  
 //   fs.readFile("C:/DATA/Geoffrey.Ge/Seneca/2020/WEB700/Assignment/2/data/employees.json", 'utf8', (err, data) => {  
                    if (err) {
                        throw err;
                        reject("unable to read file");
                    }  
                    else{  // or reject the promise (if used in a promise)      
                        employees = JSON.parse(data);
                        resolve()
                    }
                });
    });
 }


module.exports.getAllEmployees = function(){
    return new Promise(function(resolve,reject){
              if (employees.length > 0) resolve(employees);
              else reject({message:"no results"}); 
    });

}

module.exports.getManagers = function(){
    return new Promise(function(resolve,reject){
        try {
            for(k=0; k<employees.length-1;k++){
                if (employees[k].isManager){
                    managers.push(employees[k]);
                }
            }
            if(managers.length==0){
                resolve({message:"no results"});
            }
            else resolve(managers);
            
        } catch (ex) {
            reject(ex)
        } 
    });
}


module.exports.readDepartments = function(){
    return new Promise(function(resolve,reject){
        fs.readFile("./data/departments.json", 'utf8', (err, data) => {  

//        fs.readFile("C:/DATA/Geoffrey.Ge/Seneca/2020/WEB700/Assignment/2/data/departments.json", 'utf8', (err, data) => {  
            if (err) {
                throw err;
                reject("unable to read file");
            }  
            else{ 
                 departments = JSON.parse(data);
                 resolve()
            }
        });
    });
}





module.exports.getAllDepartments = function(){
 //   console.log(departments.length);
    return new Promise(function(resolve,reject){
              if (departments.length > 0) resolve(departments);
              else resolve({message:"no results"}); 
    });
}


module.exports.getEmployeesByDepartment = function(department){
   let retEmployee = [];
    return new Promise(function(resolve,reject){
        try {
            for(k=0; k<employees.length-1;k++){
                if (employees[k].department == department){
                    retEmployee.push(employees[k]);
                }
            }
            if(retEmployee.length==0){
                resolve({message:"no results returned"});
            }
            else {
                resolve(retEmployee);
            }
        } catch (ex) {
            reject(ex)
        }

    });
}

module.exports.getEmployeeByNum = function(Num){
    let retEmp = [];

     return new Promise(function(resolve,reject){
         try {
             for(k=0; k<employees.length-1;k++){
                 
                 if (employees[k].employeeNum == Num){

                     retEmp.push(employees[k]);
                 }
                }
             if(retEmp.length==0){
                 resolve({message:"no results returned"});
             }
             else {
                 resolve(retEmp);
             }
         } catch (ex) {
             reject(ex)
         }
 
     });
 }
 


function getDepartments(){
    return new Promise(function(resolve,reject){
        fs.readFile("../data/departments.json", 'utf8', (err, data) => {  
  
                    if (err) {
                    
                        throw err;
                        reject("Failed to read departments file");
                    }  
                    else{  // or reject the promise (if used in a promise)      
                        console.log("gggg:");
                        departments = JSON.parse(data);
                        resolve();
                    }
            
                })
    });
};

module.exports.getEmployeesNumber = function(){
    return employees.length;
}

module.exports.getDepartmentsNumber = function(){
    return departments.length;
}

module.exports.getManagersNumber = function(){
    return managers.length;
}

module.exports.addEmployee = function(empployData){
    return new Promise(function(resolve,reject){
        try{
//            console.log(empployData.employeeManagerNum);
            var obj= {employeeNum: module.exports.getEmployeesNumber()+1,
                firstName:empployData.firstName,
                lastName:empployData.lastName,
                email:empployData.email,
                SSN:empployData.SSN,
                addressStreet:empployData.addressStreet,
                addressCity:empployData.addressCity,
                addressState:empployData.addressState,
                addressPostal:empployData.addressPostal,
                isManager:empployData.isManager,
                employeeManagerNum:empployData.employeeManagerNum,
                status:empployData.status,
                department:empployData.department,
                hireDate:empployData.hireDate };
            newJsonData = JSON.stringify(obj);
 //           console.log(newJsonData);
         
            employees.push(JSON.parse(newJsonData));
            resolve(empployData);
        } catch(e){
            reject(e)
        }
    });
 }


// function getEmployeesByDepartment(dt) {
//     console.log(dt);
//     console.log(employees.length);
// }


function bFunc(department){
//    console.log(managers.length);
//    console.log(allData.allemployees.length);
    getEmployeesByDepartment(5);
    console.log(employees.length);
    console.log(departments.length);
    console.log(managers.length);
//     console.log(module.exports.getAllEmployees());
}

// module.exports.initialize().then(module.exports.getAllEmployees).then(()=>{
//     console.log(module.exports.getEmployeesByDepartment(5))});


// module.exports.initialize().then(module.exports.getAllEmployees).then(()=>{
//     console.log(module.exports.getEmployeeByNum(15))});

// module.exports.initialize().then(module.exports.getAllEmployees).then(bFunc);



//console.log(getAllEmployees());
// console.log(getDepartments());
// console.log(managers);

//module.exports.initialize().then(module.exports.getAllEmployees).then(module.exports.getManagers).then(module.exports.getAllDepartments).then(bFunc);
//module.exports.initialize().then(module.exports.getAllEmployees).then(module.exports.getManagers).then(module.exports.getAllDepartments).then(bFunc);
//module.exports.initialize().then(bFunc);

//.then(bFunc);
//module.exports.readEmployees().then(bFunc);
//console.log(managers.length);
//console.log("gfdhdhhd".toUpperCase());
//console.log(employees[0]);
//console.log(employees);
 

// class request {
//     var verb = "";
//     var route = "";
//     constructor(newVerb,newRoute){
//         this.verb = newVerb;
//         this.route = newRoute;
//     }

// }

// var req = new request("GET", "/about"); 
// console.log(req.verb); // "GET" 
// console.log(req.route); // "/about