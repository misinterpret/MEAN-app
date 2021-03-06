var myApp = angular.module('myApp', []);
// In LA!!
myApp.controller('AppCtrl', ['$scope', '$http', 
	function($scope, $http) {
    
    var refresh = function(){
        $http.get('/todolist').success(function(response){
        	console.log("Got data!");
            $scope.todolist = response;
            try{
                            $scope.todo.name="";
            $scope.todo.text="";
            $scope.todo.date="";
            $scope.todo.status="false";
        }catch(e){
            
        }

        });
    };
    refresh();


    $scope.addItem = function(){ 
    	console.log($scope.todo);       
        $http.post('/todolist', $scope.todo).success(function(response){
            console.log(response);
            refresh();
        });
    };

    $scope.remove = function(id){
        console.log(id);
        $http.delete('/todolist/' + id).success(function(response){
            refresh();
        });
    };

    $scope.edit = function(id){
        console.log(id);
        $http.get('/todolist/' + id).success(function(response){
            $scope.todo = response;
        });
    };

    $scope.update = function(){
        console.log($scope.todo._id);
        $http.put('/todolist/' + $scope.todo._id, $scope.todo).success(function(response){
            refresh();
        });
    };

    $scope.deselect = function(){
        $scope.todo = "";
    };


}]);













   