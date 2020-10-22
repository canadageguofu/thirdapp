const express = require("express");
const app = express();
const myDataModule = require("./modules/serverDataModule.js");
const path = require("path");
const { Console } = require("console");


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
        }).catch((err)=>{
    //        console.log(err);
            res.send(err);
        })
});






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
    res.sendFile(path.join(__dirname, "/image/Err_404.png"));
 //   res.status(404).send("404 page cannot find");
});


myDataModule.initialize().then(()=>{
    app.listen(HTTP_PORT, ()=>{
        console.log("listening on: " + HTTP_PORT);
    });
}).catch((err)=>{
    console.log(err);
})

