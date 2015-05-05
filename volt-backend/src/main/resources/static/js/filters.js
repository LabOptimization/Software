angular.module('voltFilters', []).filter('checkmark', function() {
  return function(input) {
    return input ? '✓' : '✘';
  };
});