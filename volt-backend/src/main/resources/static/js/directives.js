var directives = angular.module('directives', []);

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

directives.
  directive('dynamicErrors', function() {
    return {
      restrict: 'A',
      //require:  '^form',
      link: function (scope, el, attrs, formCtrl) {
        el.attr('show-errors','');
      }
    }
  });