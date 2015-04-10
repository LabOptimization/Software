var voltApp = angular.module('voltApp', []);

voltApp.controller('PeopleListCtrl', function ($scope) {
      $scope.jobs = [
          {'name': 'Joe',
           'job': 'Plumber'},
           {'name': 'Mary',
           'job': 'Pilot'},
           {'name': 'Bill',
           'job': 'Unemployed'}
      ];
      $scope.name = "Go";
});

voltApp.directive('aGreatEye', function(){
    return {
        restrict: 'E',
        replace: true,
        template: '<h1> Wow template  {{ 4 + 32143 }} </h1>'
    };
});

