angular.module("employeesApp", ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "list.html",
                controller: "EmployeesController",
                resolve: {
                    employees: function(Employees) {
                        return Employees.getEmployees();
                    }
                }
               
					})
            .when("/create", {
                controller: "NewEmployeeController",
                templateUrl: "create.html"
            })
          
    })

	.service("Employees", function($http) {
        this.getEmployees = function() {
            return $http.get("/list").
                then(function(response) {
					console.log("response:",response);
                    return response;
                }, function(response) {
                    alert("Error finding employee.");
                });
        }
        this.createEmployee = function(employee) {
            return $http.post("/create", employee).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error creating employee.");
                });
        }
        this.getEmployee= function(employeeID){
				return $http.get("/list/" + employeeID).
                then(function(response) {
					console.log("response:",response);
                    return response;
                }, function(response) {
                    alert("Error getting employee.");
                });
			}
        
        
        this.editEmployee = function(employee) {
            var url = "/list/" + employee.id;
            console.log("id to edit:",employee.id);
            return $http.put(url, employee).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error editing this employee.");
                    console.log(response);
                });
        }
        this.deleteEmployee = function(employeeId) {
          
            return $http.delete( "/list/" + employeeId).
                then(function(response) {
                  //  return response;
                }, function(response) {
                    alert("Error deleting this employee.");
                    console.log(response);
                });
        }
    })
    
    
    .controller("EmployeesController", function(employees,Employees, $scope,$route,$location) {
		//initializing the fields
		$scope.name="";
		$scope.dept="";
		$scope.dateofbirth="";
		$scope.yearsExp=0;
        $scope.employees = employees.data;
        $scope.hideEdit=true;
        var updateID;
        $scope.Depts = ["IT", "HR", "Managment","Net"];
        
        
		$scope.removeEmployee = function (empID) {
				Employees.deleteEmployee(empID);
				$route.reload();
		};
		
		//fill the form with the selected employee's info
		$scope.openForm=function(employeeID){
			$scope.hideEdit=false;
			console.log("employeeID",employeeID);
		var newEmp=Employees.getEmployee(employeeID);
		console.log("newEmp",newEmp);
		newEmp.then(function(data){
				updateID=data.data.id;
				$scope.name=data.data.name;
				$scope.dept=data.data.dept;
				$scope.dateofbirth=data.data.dateofbirth;
				$scope.yearsExp=data.data.yearsExp;
				}
			)
		};
		
		//fired when save button
		$scope.saveMe=function(){
				var updateEmployee={
						id:updateID,
						name:$scope.name,
						dept:$scope.dept,
						dateofbirth:$scope.dateofbirth,//getting date in right format
						yearsExp:$scope.yearsExp
					}
				console.log("date of birth:",$scope.dateofbirth);
				var upEmp=Employees.editEmployee(updateEmployee);
				console.log("upEmp:",upEmp);
				$route.reload();
				$scope.hideEdit=true;
			}
		
		$scope.redirectMe=function(){
			$location.path('/create');
		}
    })

	
	.controller("NewEmployeeController", function($scope, Employees, $location) {
		$scope.Depts = ["IT", "HR", "Managment","Net"];
		var addEmployee;
        $scope.createNewEmployee = function(){
			 addEmployee={
						id:0,
						name:$scope._name,
						dept:$scope._dept,
						dateofbirth:$scope._dateofbirth,
						yearsExp:$scope._yearsExp
					}
			Employees.createEmployee(addEmployee);
			$location.path('/');
	 }
		 
	 
    })
    
	.directive('ngConfirmClick', [
    function(){
        return {
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure?";
                var clickAction = attr.confirmedClick;
                element.bind('click',function (event) {
                    if ( window.confirm(msg) ) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
}])
   


