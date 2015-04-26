

var voltControllers = angular.module('voltControllers', []);


voltApp.controller('HomeCtrl', ['$scope', '$http', function ($scope, $http) {

    /*
    $http.get('/labs').success(function(data) {
      $scope.labs = data;
      $scope.mainImageUrl = data[0].TitleImage;
    });
    */


}]);
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

voltControllers.controller('LabCreateCntrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http){
    var _name = '';
    $scope.name = function(newName) {
        if (angular.isDefined(newName)) {
            _name = newName;
        }
        return _name;
    };

}]);


voltApp.directive('aGreatEye', function(){
    return {
        restrict: 'E',
        replace: true,
        template: '<h1> Wow template  {{ 4 + 32143 }} </h1>'
    };
});

