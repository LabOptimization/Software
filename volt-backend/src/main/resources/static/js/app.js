var voltApp = angular.module('voltApp', [
  'ngRoute',
  'voltControllers',
  'voltFilters',
  'voltServices',
  'directives'

 ]);

voltApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: '/html/partials/home.html',
        controller: 'HomeCtrl'
      }).
      when('/create', {
        templateUrl: '/html/partials/create-lab.html',
        controller: 'LabCreateCntrl'
      }).
      when('/labs', {
        templateUrl: '/html/partials/labs.html',
        controller: 'LabViewCntrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
 }]);