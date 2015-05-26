var voltControllers = angular.module('voltControllers', []);


voltApp.controller('HomeCtrl', ['$scope', '$http', function ($scope, $http) {

}]);

test = '';


function addDescription($scope, $compile, stepId){
    var div = document.getElementById('step'+stepId);
    var linkFn = $compile('<textarea ng-model-options="{ getterSetter: true }"  name="description" ng-model="description"></textarea>');
    var html = linkFn($scope);
    test = html;
    angular.element(div).append(html);
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
function setElementModel(string, model){
    return string.replace(/##/g,model);
}

function setStepModel(element, id){
    element.find('.step-number').text((id+1)+'');
    return element.html(element.html().replace(/steps\[0\]/g, 'steps['+id+']'));
}

function StepElement(type,parent){
    return {
        type: type, value:null, step: parent, plusTolerance:0, negTolerance:0
    };
}

function Step(id, sel){
    return {
        id: id, name:'', elements: [], currentSelect: sel
    };
}


voltControllers.controller('LabCreateCntrl', ['$scope', '$http', '$compile','htmlPartial',function($scope, $http,$compile, htmlPartial){

    var _name = '';
    var _des = '';
    $scope.templates = {};
    $scope.stepElements = ['value-question', 'graph-question', 'lab-description'];
    var numTemplates = 4;
    $scope.templates['step'] = angular.element(document.getElementById('step0')).clone();
    var defaultSelect = $scope.stepElements[0];

    $scope.form = {
        name: '',
        steps: [
            { id: 0, name:'', elements:[], currentSelect: defaultSelect }
        ]
    };

    // show options only when partials arrive
    $scope.showButtons = false;
    var setupFn = function(){
        if (Object.size($scope.templates) == numTemplates){
            $scope.showButtons = true;
        }
     };

    for (var i in $scope.stepElements){
        (function(){
            var ele = $scope.stepElements[i];

            $http.get('/html/partials/'+ele+'.html')
            .success(function(res){
                $scope.templates[ele] = res;
                setupFn();
            }).error(function(){ console.log('No go for '+ele); });
        })();
    }

    $scope.addElementToStep = function(res){

        var step = res.target.parentElement;
        while(step.id.indexOf('step') == -1)
        {
            step = step.parentElement;
        }

        var id = parseInt(step.id.replace('step',''));

        // get the value from dropdown
        var sel = $scope.form.steps[id].currentSelect;

        if (!sel){
            return;
        }

        var linkFn = null;
        // add a Step Element to the form
        $scope.form.steps[id].elements.push(new StepElement(sel, $scope.form.steps[id]));
        var indx = $scope.form.steps[id].elements.length -1;

        var templ = setElementModel($scope.templates[sel], 'form.steps['+id+'].elements['+indx+']');
        linkFn =  $compile(templ);
        var html = linkFn($scope);
        $(step).find('.insertArea').append(html);
        test = $scope.form;

    };

    $scope.removeElement = function(event, model){
        if (!model) return;
        event.target.parentElement.remove();
        var indx = model.step.elements.indexOf(model);
        if (indx > -1){
            // Set a tombstone to not mess up position of other elements
            model.step.elements[indx] = null;
        }
    };

    $scope.addStep = function(){
        var newStep = $scope.templates['step'].clone();
        var id = $scope.form.steps.length;
        newStep.id = 'step' + id;
        newStep.attr('id', newStep.id);

        $scope.form.steps.push( new Step(id, defaultSelect) );

        setStepModel(newStep, id);
        var linkFn = $compile(newStep);
        var html = linkFn($scope);
        angular.element(document.getElementById('stepArea'))
                .append(html);

    };



}]);
