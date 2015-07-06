'use strict';
var app = angular.module("app", ["firebase"]);
app.factory("todoFactory", ["$firebaseArray", function ($firebaseArray) {
    var ref = new Firebase("https://amber-torch-288.firebaseio.com/ToDOApp");
    return $firebaseArray(ref);
}]);
app.controller("ToDoAppController", ["$scope", "todoFactory", function ($scope, todoFactory) {
    $scope.newTodo = "";
    $scope.masterCheckBoxStatus = false;
    $scope.todos = todoFactory;
    $scope.addTodo = function () {
        $scope.todos.$add({
            noteText: $scope.newTodo,
            createdDate: $scope.getFormattedDate(),
            isDone: false,
            inEditMode: false
        });
        $scope.newTodo = "";
    };
    $scope.addTodo = function () {
        $scope.todos.$add({
            noteText: $scope.newTodo,
            createdDate: $scope.getFormattedDate(),
            isDone: false,
            inEditMode: false
        });
        $scope.newTodo = "";
    };
    $scope.todos.$loaded(function () {
        if ($scope.todos.length === 0) {
            console.log("Empty List.");
        }
        else {
            var status = false;
            var trueCount = 0;
            var falseCount = 0;
            angular.forEach($scope.todos, function (k) {
                status = k.isDone;
                if (k.isDone) {
                    trueCount++;
                }
                else {
                    falseCount++;
                }
            });
            if (trueCount === $scope.todos.length || falseCount === $scope.todos.length)
                $scope.masterCheckBoxStatus = status;
            else
                $scope.masterCheckBoxStatus = false;
        }
    });
    $scope.edit = function (todo) {
        todo.inEditMode = true;
    };
    $scope.save = function (todo) {
        todo.inEditMode = false;
        $scope.todos.$save(todo);
    };
    $scope.selectAll = function () {
        angular.forEach($scope.todos, function (i) {
            i.isDone = $scope.masterCheckBoxStatus;
            $scope.todos.$save(i);
        });
        return true;
    };
    $scope.getFormattedDate = function () {
        var _date = new Date();
        var month = _date.getMonth() + 1;
        var day = _date.getDate();
        var year = _date.getFullYear();
        var formattedDate = month + "/" + day + "/" + year;
        console.log(formattedDate);
        return formattedDate;
    };
}]);
//# sourceMappingURL=app.js.map