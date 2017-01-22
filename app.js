angular.module('employeesApp', []).controller('empController', function($scope) {
	
$scope.id = '';
$scope.name = '';
$scope.dateofbirth = '';
$scope.dept = '';
$scope.yearsExp = '';

$scope.employees = [
{id:1, name:'Naji', dateofbirth:"1/2/1994" ,dept:'HR', yearsExp:60 },
{id:2, name:'Yousef', dateofbirth:"1/2/1970" ,dept:'IT', yearsExp:60 },
{id:3, name:'Abdul', dateofbirth:"1/2/1940" ,dept:'Barbeque', yearsExp:60 },
{id:4, name:'Jawwad', dateofbirth:"1/2/1920" ,dept:'manage', yearsExp:60 },
{id:5, name:'Ismaeel', dateofbirth:"1/2/1900" ,dept:'orio', yearsExp:60 },
];

$scope.editEmployee = function(id) {

    $scope.name = $scope.employees[id-1].name;
    $scope.dateofbirth = $scope.employees[id-1].dateofbirth; 
    $scope.dept = $scope.employees[id-1].dept; 
    $scope.yearsExp = $scope.employees[id-1].yearsExp; 
};

$scope.removeItem = function (x) {
        $scope.employees.splice(x,1);
 };

$scope.$watch('passw1',function() {$scope.test();});
$scope.$watch('passw2',function() {$scope.test();});
$scope.$watch('fName', function() {$scope.test();});
$scope.$watch('lName', function() {$scope.test();});

$scope.test = function() {
  if ($scope.passw1 !== $scope.passw2) {
    $scope.error = true;
    } else {
    $scope.error = false;
  }
  $scope.incomplete = false;
  if ($scope.edit && (!$scope.fName.length ||
  !$scope.lName.length ||
  !$scope.passw1.length || !$scope.passw2.length)) {
     $scope.incomplete = true;
  }
};

});
