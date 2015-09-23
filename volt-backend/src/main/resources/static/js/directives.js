var directives = angular.module('directives', []);

/*
directives.
  directive('showErrors', function() {
    return {
      restrict: 'A',
      link: function (scope, el, attrs, formCtrl) {
        var inputEl   = el[0].querySelector("[name]");
        var inputNgEl = angular.element(inputEl);

        var inputName = inputNgEl.attr('name');

        // only apply the has-error class after the user leaves the text box
        inputNgEl.bind('blur', function() {
          if (!formCtrl)
          {
            formCtrl = scope.formCtrl;
          }
          el.toggleClass('has-error', formCtrl[inputName].$invalid);
        });

      }
    }
  });
*/
directives.
  directive('stepElement', function($compile) {
 

    return {
        restrict: 'A',        
        compile: function(element, attrs) {

            console.log(element)
            angular.forEach(element.find('input'), function(node){ 
                node = angular.element(node);
                console.log(node)
                //node.attr('ng-model', attrs.stepElement + '.' + node.attributes['name'].value );
                node.attr('ng-model', attrs.stepElement + '.'+node.attr('name'));
                console.log('node',node.attributes);
            });
            element.removeAttr("step-element");
            return {
               pre: function preLink(scope, iElement, iAttrs, controller) { },
               post: function postLink(scope, iElement, iAttrs, controller) { 
                 $compile(iElement)(scope);
               }
            }
        }
    }
  
  });
