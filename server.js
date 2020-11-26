/********************************************************************************* 
 *  WEB700 – Assignment 05 
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part  
 *  of this assignment has been copied manually or electronically from any other source  
 * (including 3rd party web sites) or distributed to other students. 
 * Name: ___GUO FU GE___________Student ID: 056717044 Date: 2020-11-27________________ 
 * *********************************************************************************/ 

const express = require("express");
const app = express();
const myDataModule = require("./modules/serverDataModule.js");
const path = require("path");
const { Console } = require("console");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
 


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const HTTP_PORT = process.env.PORT || 8080;

app.engine(".hbs", exphbs({
    extname: ".hbs",
//    defaultLayout: 'main',
    helpers: {
        boldify: function(options){
            return "<strong><em>" + options.fn(this) + "</em></strong>"
        },
        makeList: function(context, options){
            let ret = "<ul>";
            for(let i = 0; i < context.length; i++){
                ret += "<li>" + options.fn(context[i]) + "</li>";
            }
            ret += "</ul>"

            return ret;
        },
        
        navLink: function(url, options){     
            return '<li' + ((url == app.locals.activeRoute) ? ' class="nav-item active" ' : ' class="nav-item" ') + '><a class="nav-link" href="' + url + '">' + options.fn(this) + '</a></li>'; 
        }, 
        equal: function (lvalue, rvalue, options) {     
            if (arguments.length < 3)         
                throw new Error("Handlebars Helper equal needs 2 parameters");    
            if (lvalue != rvalue) {        
                 return options.inverse(this);     
            } 
            else {         
                return options.fn(this);     
            } 
        } 
 
    }
}));

app.set("view engine", ".hbs");


app.get("/", (req,res)=>{
 //   res.send("Hello World!");
//    res.sendFile(path.join(__dirname, "/views/home.html"));
    res.render(path.join(__dirname, "/views/home.hbs"));
 //   {layout: true};
});

app.get("/About", (req,res)=>{
    //   res.send("Hello World!");
//       res.sendFile(path.join(__dirname, "/views/about.html"));
    res.render(path.join(__dirname, "/views/about.hbs"));
});

app.get("/htmlDemo", (req,res)=>{
    //   res.send("Hello World!");
    //    res.sendFile(path.join(__dirname, "/views/htmlDemo.html"));
    res.render(path.join(__dirname, "/views/htmlDemo.hbs"));
   });

   
/*
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
*/
 app.get("/employees", (req,res)=>{
    if(req.query.department){
        myDataModule.getEmployeesByDepartment(req.query.department).then((data)=>{
            // res.send(JSON.stringify(data));
            res.render("employees", {employees: data});
            }).catch((err)=>{
        //        console.log(err);
                // res.send(err);
                res.render("employees", {message: "no results"}); 
            })
    }
    else
    {
        myDataModule.getAllEmployees().then((data)=>{
        // res.send(JSON.stringify(data));
        res.render("employees", {employees: data});
        }).catch((err)=>{
    //        console.log(err);
        res.render("employees", {message: "no results"}); 
    //        res.send(err);
        })
    }
    
//    res.render(JSON.stringify(data));
//    res.render("employees", {employees: data}); 
 });


 app.get("/employees/:num", (req,res)=>{
 //   console.log(req.params.num);
    if(req.params.num){
         myDataModule.getEmployeeByNum(req.params.num).then((data)=>{
 //               res.send(JSON.stringify(data));
                res.render("employee", {employee: data[0] }); 
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
 // res.send(JSON.stringify(data));
 //       res.JSON(data);
            res.render("departments", {departments: data});
        }).catch((err)=>{
    //        console.log(err);
//            res.send(err);
            res.render("departments", {message: "no results"}); 
        })
});

app.get("/department/:id", (req,res)=>{
       if(req.params.id){
                myDataModule.getDepartmentById(req.params.id).then((data)=>{ 
                    res.render(path.join(__dirname, "/views/department.hbs"),{department:data[0]});
                }).catch((err)=>{
                    res.send(err);
                })
           }
        }
   );


app.get("/employee/add", (req,res)=>{
/*       res.send("Hello World!");*/
//        res.sendFile(path.join(__dirname, "/views/addEmployee.html"));
    res.render(path.join(__dirname, "/views/addEmployee.hbs"));
   });



app.post('/employee/add', function (req, res) {
    req.body.isManager = (req.body.isManager) ? true : false;
 //  console.log(JSON.stringify({message:"ok"}));
    // newJsonData = JSON.stringify({employeeNum: myDataModule.getEmployeesNumber()+1 });
    // console.log(newJsonData);
    myDataModule.addEmployee(req.body).then(()=>{
 //       console.log(req.body);
        res.status(301).redirect("http://localhost:8080/employees");
    });
  })

  app.post("/employee/update", (req, res) => {
        req.body.isManager = (req.body.isManager) ? true : false;     
//      console.log(req.body);     
//      res.redirect("/employees"); 
        myDataModule.updateEmployee(req.body).then(()=>{
    //       console.log(req.body);
           res.status(301).redirect("http://localhost:8080/employees");
       });
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
    res.sendFile(path.join(__dirname, "/public/image/Err_404.png"));
 //   res.status(404).send("404 page cannot find");
});

app.use(function(req,res,next){     
    let route = req.baseUrl + req.path;     
    app.locals.activeRoute = (route == "/") ? "/" : route.replace(/\/$/, "");     
    next(); 
}); 

myDataModule.initialize().then(()=>{
    app.listen(HTTP_PORT, ()=>{
        // console.log(__dirname);
        console.log("listening on: " + HTTP_PORT);
    });
}).catch((err)=>{
    console.log(err);
})

