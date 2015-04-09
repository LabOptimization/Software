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
});


