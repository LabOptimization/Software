var voltControllers = angular.module('voltControllers', []);


voltControllers.controller('HomeCtrl', ['$scope', '$http', function ($scope, $http) {

}]);

test = '';

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


voltControllers.controller('LabCreateCntrl', ['$scope', '$http', '$compile','htmlPartial','$timeout',
                                    function($scope, $http,$compile, htmlPartial,$timeout){

    $scope.showForm=true;

    // utility for iterating in dom
    $scope.range = function(min, max, step){
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) input.push(i);
        return input;
    };

    test = $scope;

    $scope.steps = [];
    $scope.steps.push({id:0, elements:[]})
    $scope.steps.push({id:1,elements:[]})


    //$scope.n = 'wow'
    $scope.elements = [ ];
    $scope.elements.push({type:'graph', id:0});
    $scope.elements.push({type:'value', id:1});
    $scope.elements.push({type:'description', id:2});

    for (i in $scope.steps)
        $scope.steps[i].elements = $scope.elements;
    //$scope.elements.push($scope.templates['value-question'].clone())


}]);

voltControllers.controller('LabViewCntrl', ['$scope', '$http', function ($scope, $http) {
    console.log('LabViewCntrl');

    $http.get('/labs').
      success(function(data, status, headers, config){
        console.log('Labs',data);
        if (data._embedded){
            $scope.labs = data._embedded.labs;
        }
      }).
      error(function(data, status, headers, config) {
        console.log('Error retrieving labs!',arguments);
      });

}]);
