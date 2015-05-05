var voltServices = angular.module('voltServices', ['ngResource']);

voltServices.factory('Lab', ['$resource',
  function($resource){
    return $resource('labs/:labId', {}, {
      query: {method:'GET', params:{phoneId:'labs'}, isArray:true}
    });
 }]);

voltServices.factory('htmlPartial', ['$resource',
  function($resource){
    return $resource('/html/partials/:partial.html', {}, {
      valueQuestion: {method:'GET', params:{partial:'value-question'}},
      graphQuestion: {method:'GET', params:{partial:'graph-question'}},
      labDescription: {method:'GET', params:{partial:'lab-description'}},
      isArray:false
    });
  }
]);