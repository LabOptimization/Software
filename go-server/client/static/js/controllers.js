

var voltControllers = angular.module('voltControllers', []);
var i = 0;
voltApp.controller('LabListCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.name = "Go";
    $scope.orderProp = 'name';

    $http.get('/labs').success(function(data) {
      $scope.labs = data;
      $scope.mainImageUrl = data[0].TitleImage;
    });

    $scope.setImage = function(url){
        $scope.mainImageUrl = url;
    };
}]);

voltControllers.controller('LabDetailCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $scope.labId = $routeParams.labId;

    $http.get('/labs/' + $scope.labId).success(function(data) {
      $scope.lab = data;
    });

}]);


voltApp.directive('aGreatEye', function(){
    return {
        restrict: 'E',
        replace: true,
        template: '<h1> Wow template  {{ 4 + 32143 }} </h1>'
    };
});

