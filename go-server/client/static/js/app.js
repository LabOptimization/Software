var voltApp = angular.module('voltApp', [
  'ngRoute',
  'voltControllers',
  'voltFilters',
  'voltServices'

 ]);

voltApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: '/s/html/partials/home.html',
        controller: 'HomeCtrl'
      }).
      when('/create', {
        templateUrl: '/s/html/partials/create-lab.html'//,
        //controller: 'LabCreateCntrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
 }]);