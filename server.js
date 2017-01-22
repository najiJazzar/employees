var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

//var list of employees
var empList=[
{id:1, name:'Naji', dateofbirth:"1/2/1994" ,dept:'Managment', yearsExp:60 },
{id:2, name:'Yousef', dateofbirth:"1/2/1970" ,dept:'HR', yearsExp:60 },
{id:3, name:'Abdul', dateofbirth:"1/2/1940" ,dept:'Managment', yearsExp:60 },
{id:4, name:'Jawwad', dateofbirth:"1/2/1920" ,dept:'IT', yearsExp:60 },
{id:5, name:'Ismaeel', dateofbirth:"1/2/1900" ,dept:'Net', yearsExp:60 },
];

var globalID=6; //initiate to zero when starting with empty list

//function returns index of id
function search(empId){
    for (var i=0; i < empList.length; i++) {
        if (empList[i].id == empId) {
            return i;
        }
    }
    return -1;//sentinel 
}


//making app and public (OMMIT)********************
var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());


// Error handler function
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

var port = process.env.OPENSHIFT_NODEJS_PORT || 8083
, ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
app.listen(port, ip, function() {
  console.log('Express server listening on %d', port);
});



/** "/list"
 * 
 * GET : list all employees.
 * 
 * **/
app.get('/list', function (req, res) {
       res.json(empList);
       console.log("listed employees");
})

/**  "/:id"
 * 
 * PUT : edit employee
 * GET : get specific employee
 * DELETE: delete employee
 * 
 * */
app.put("/list/:id", function(req, res){
	var index=search(req.params.id,empList);
	console.log("updated employee",req.body);
	
	empList[index]=req.body;
	res.json(empList);
	

	})

app.get('/list/:id', function (req, res) {
	   var index=search(req.params.id);
       res.json(empList[index]);
      
})

app.delete("/list/:id", function(req, res){
	index=search(req.params.id,empList);
	empList.splice(index,1);
	res.json(empList);
	})
	
/**  "/create"
 * 
 * POST : add new employee
 * 
 * */
app.post('/create', function (req, res) {
	console.log(req.body);
	newEmployee=req.body;
	newEmployee.id=globalID;
	globalID++;
	empList[empList.length]=newEmployee;
	res.json(empList);
	console.log("added an employee");

	
})



/*
var server = app.listen(process.env.PORT || 8082, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });

*/
