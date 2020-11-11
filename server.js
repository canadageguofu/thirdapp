/********************************************************************************* 
 *  WEB700 – Assignment 03 
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part  
 *  of this assignment has been copied manually or electronically from any other source  
 * (including 3rd party web sites) or distributed to other students. 
 * Name: ___GUO FU GE___________Student ID: 056717044 Date: 2020-10-25________________ 
 * *********************************************************************************/ 

const express = require("express");
const app = express();
const myDataModule = require("./modules/serverDataModule.js");
const path = require("path");
const { Console } = require("console");
const bodyParser = require("body-parser");
 

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const HTTP_PORT = process.env.PORT || 8080;

app.get("/", (req,res)=>{
 //   res.send("Hello World!");
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get("/About", (req,res)=>{
    //   res.send("Hello World!");
       res.sendFile(path.join(__dirname, "/views/about.html"));
   });

app.get("/htmlDemo", (req,res)=>{
    //   res.send("Hello World!");
       res.sendFile(path.join(__dirname, "/views/htmlDemo.html"));
   });

   

app.get("/employees", (req,res)=>{
    if(req.query.department){
        myDataModule.getEmployeesByDepartment(req.query.department).then((data)=>{
            res.send(JSON.stringify(data));
            }).catch((err)=>{
        //        console.log(err);
                res.send(err);
            })
    }
    else
    {
        myDataModule.getAllEmployees().then((data)=>{
        res.send(JSON.stringify(data));
        }).catch((err)=>{
    //        console.log(err);
            res.send(err);
        })
    }
 });

 app.get("/employees/:num", (req,res)=>{
 //   console.log(req.params.num);
    if(req.params.num){
         myDataModule.getEmployeeByNum(req.params.num).then((data)=>{
                res.send(JSON.stringify(data));
                }).catch((err)=>{
            //        console.log(err);
                    res.send(err);
                })
        }
    }
);



 app.get("/managers", (req,res)=>{
    
        myDataModule.getManagers().then((data)=>{
            res.send(JSON.stringify(data));
            }).catch((err)=>{
        //        console.log(err);
                res.send(err);
            })
 });

 app.get("/departments", (req,res)=>{
    myDataModule.getAllDepartments().then((data)=>{
        res.send(JSON.stringify(data));
 //       res.JSON(data);
        }).catch((err)=>{
    //        console.log(err);
            res.send(err);
        })
});

app.get("/employee/add", (req,res)=>{
/*       res.send("Hello World!");*/
        res.sendFile(path.join(__dirname, "/views/addEmployee.html"));
   });

app.post('/employee/add', function (req, res) {
    req.body.isManager = (req.body.isManager) ? true : false;
 //  console.log(JSON.stringify({message:"ok"}));
    // newJsonData = JSON.stringify({employeeNum: myDataModule.getEmployeesNumber()+1 });
    // console.log(newJsonData);
    myDataModule.addEmployee(req.body).then(()=>{
        console.log(req.body);
        res.status(301).redirect("http://localhost:8080/employees");
    });
  })


app.get("/addStudent", (req,res)=>{
    myDataModule.addStudent({name: "NEW STUDENT", age: 1000, enrolled: false}).then((msg)=>{
        res.send(msg);
    }).catch((err)=>{
        res.send(err);
    });
});

app.use((err,req,res,next)=>{
    res.status(500).send("500 page cannot find");
});

app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname, "/public/image/Err_404.png"));
 //   res.status(404).send("404 page cannot find");
});


myDataModule.initialize().then(()=>{
    app.listen(HTTP_PORT, ()=>{
        // console.log(__dirname);
        console.log("listening on: " + HTTP_PORT);
    });
}).catch((err)=>{
    console.log(err);
})

