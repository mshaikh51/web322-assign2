var path = require("path");
var express = require("express");
var app = express();
var HTTP_PORT = process.env.PORT || 8080;
var data=require("./data-service");

function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}
app.use(express.static('public'));
app.get("/", function(req,res){
    res.sendFile(path.join(__dirname,"/views/home.html"));
});

app.get("/home",function(req,res) {
    res.sendFile(path.join(__dirname,"/views/home.html"));
})
app.get("/about", function(req,res){
    res.sendFile(path.join(__dirname,"/views/about.html"));
});

app.get("/employees", function(req,res){
    data.getAllEmployees().then(function(data){
        res.json(data);
    }).catch(function(err){
       res.json({message: err});
    });
});

app.get("/managers", function(req,res){
    data.getManagers().then(function(data){
        res.json(data);
    }).catch(function(err){
       res.json({message: err});
    });
});

app.get("/departments", function(req,res){
    data.getDepartments().then(function(data){
        res.json(data);
    }).catch(function(err){
       res.json({message: err});
    });
});

app.get('*', function(req, res){
    res.send('<h1 class=\"error\">Page Not Found</h1>', 404);
  });


data.initialize().then(function() {
app.listen(HTTP_PORT, onHttpStart);    
}).catch(function(data){
//when data is not loaded at all
    console.log(data);
});
