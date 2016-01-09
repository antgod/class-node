var app = angular.module('mvcModule', []);//定会引起一个模块
//定义一个控制器 $scope就是这个控制器对应的视图模型
app.controller('mvcController', function ($scope) {
    $scope.say = 'hello';
    $scope.clickMe = function () {
        console.log($scope.say);
    }
});