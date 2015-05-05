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
function setModel(string, model){
    return string.replace(/##/g,model);
}

function StepElement(type,parent){
    return {
        type: type, value:null, step: parent, plusTolerance:0, negTolerance:0
    };
}


voltControllers.controller('LabCreateCntrl', ['$scope', '$http', '$compile','htmlPartial',function($scope, $http,$compile, htmlPartial){

    var _name = '';
    var _des = '';
    $scope.templates = {};
    $scope.stepElements = ['value-question', 'graph-question', 'lab-description'];
    var numTemplates = 4;
    $scope.templates['step'] = angular.element(document.getElementById('step0')).clone();



    $scope.form = {
        name: '',
        steps: [
            { id: 0, name:'', elements:[], currentSelect: $scope.stepElements[0] }
        ]
    };

    $scope.showButtons = false;
    var setupFn = function(){
        if (Object.size($scope.templates) == numTemplates){
            console.log('showing elements');
            $scope.showButtons = true;
        }
     };

    $scope.addElementToStep = function(res){
        var step = res.srcElement.parentElement.parentElement;
        var id = parseInt(step.id.replace('step',''));
        var sel = $scope.form.steps[id].currentSelect;

        if (!sel){
            return;
        }

        var linkFn = null;
        $scope.form.steps[id].elements.push(new StepElement(sel, $scope.form.steps[id]));
        var indx = $scope.form.steps[id].elements.length -1;

        var templ = setModel($scope.templates[sel], 'form.steps['+id+'].elements['+indx+']');
        linkFn =  $compile(templ);
        var html = linkFn($scope);
        angular.element(step.children[1]).append(html);
        test = $scope.form;

    };

    $scope.removeElement = function(event, model){
        if (!model) return;
        event.srcElement.parentElement.remove();
        var indx = model.step.elements.indexOf(model);
        if (indx > -1){
            model.step.elements[indx] = null;
            console.log('removed element!');
        }
    };

    $scope.addStep = function(){
        angular.element(document.getElementById('stepArea'));
    };

    for (var i in $scope.stepElements){
        (function(){
            var ele = $scope.stepElements[i];

            $http.get('/s/html/partials/'+ele+'.html')
            .success(function(res){
                $scope.templates[ele] = res;
                console.log('requested '+ele);
                setupFn();
            }).error(function(){ console.log('No go'); });
        })();
    }


}]);
