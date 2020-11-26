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

app.get("/", (req,res)=>{
 //   res.send("Hello World!");
    res.sendFile(path.join(__dirname, "/views/home.html"));
});


app.post('/addProduct', function (req, res) {
    myDataModule.addEmployee(req.body).then(()=>{
        console.log(req.body);

        res.send(JSON.stringify({message:"prodoct" +vreq.body.description + "added to the inventory list:" + req.body.price});
    });
  })




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





app.get("/employee/add", (req,res)=>{
/*       res.send("Hello World!");*/
        res.sendFile(path.join(__dirname, "/views/addEmployee.html"));
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

