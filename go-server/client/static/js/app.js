var voltApp = angular.module('voltApp', [
  'ngRoute',
  'voltControllers',
  'voltFilters'
]);

voltApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/labs', {
        templateUrl: '/s/html/partials/labs.html',
        controller: 'LabListCtrl'
      }).
      when('/labs/:labId', {
        templateUrl: '/s/html/partials/lab-detail.html',
        controller: 'LabDetailCtrl'
      }).
      otherwise({
        redirectTo: '/labs'
      });
 }]);