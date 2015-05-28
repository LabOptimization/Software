var voltControllers = angular.module('voltControllers', []);


voltControllers.controller('HomeCtrl', ['$scope', '$http', function ($scope, $http) {

}]);

test = '';

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

function setStepModel(element, id, stepNumber){
    element.find('.step-number').text((stepNumber)+'');
    return element.html(element.html().replace(/steps\[0\]/g, 'steps['+id+']'));
}

function StepElement(type,parent){
    return {
        type: type, value:null, step: parent, plusTolerance:0, negTolerance:0, label:''
    };
}

function Step(id, sel){
    return {
        id: id, name:'', elements: [], currentSelect: sel
    };
}

function getStep(element)
{
        var step = element.target.parentElement;
        while(step.id.indexOf('step') == -1)
        {
            step = step.parentElement;
        }

        return step;

}

function getStepId(step)
{
    return parseInt(step.id.replace('step',''));
}

function serializeForm(form)
{
    for(i in form.steps)
    {
        // remove tombstones
        if (form.steps[i] == null)
        {
            form.steps.splice(i,1);
        }
        else
        {
            for (j in form.steps[i].elements)
            {
                if (form.steps[i].elements[j] == null)
                {
                    form.steps[i].elements.splice(j,1);
                }
                else
                {
                    // remove circular reference
                    form.steps[i].elements[j].step = null;
                }
            }
        }
    }
}

voltControllers.controller('LabCreateCntrl', ['$scope', '$http', '$compile','htmlPartial',function($scope, $http,$compile, htmlPartial){

    $scope.showLoading = false;
    $scope.showForm = true;

    var _name = '';
    var _des = '';
    $scope.templates = {};
    $scope.stepElements = ['value-question', 'graph-question', 'lab-description'];
    var numTemplates = 4;
    $scope.templates['step'] = angular.element(document.getElementById('step0')).clone();
    var defaultSelect = $scope.stepElements[0];

    $scope.form = {
        name: '',
        description:'',
        numSteps: 1,
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

        var step = getStep(res);
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
        $scope.form.numSteps++;
        setStepModel(newStep, id, $scope.form.numSteps);
        var linkFn = $compile(newStep);
        var html = linkFn($scope);
        console.log('appending');
        angular.element(document.getElementById('stepArea'))
                .append(html);

    };

    $scope.removeStep = function(event){
        var step = getStep(event);

        var id = parseInt(step.id.replace('step',''));

        if ($scope.form.steps[id-1] === null){
            return;
        }
        // set a tombstone
        $scope.form.steps[id-1] = null;
        $scope.form.numSteps--;
        $('.step').each(function(){
            var oldId = getStepId(this);
            if (oldId > id){
                var oldStep = $(this);
               oldStep.find('.step-number').html(parseInt(oldStep.find('.step-number').html())-1);
               //oldStep.attr('id', 'step'+(oldId));
            }
        });
        step.remove();

    };

    $scope.submit = function(valid){
        if (!valid) return;
        console.log('submit!');
        $scope.showLoading = true;
        $scope.showForm = false;
        serializeForm($scope.form);
        $scope.form.steps = JSON.stringify($scope.form.steps);
        $http.post('/labs', $scope.form).
          success(function(data, status, headers, config) {
            console.log('_success',data);
            console.log(data._links.self.href);
            $scope.submissionLink = data._links.self.href;
            console.log('steps: ', $scope.form.steps);
            $scope.showLoading = false;
          }).
          error(function(data, status, headers, config) {
            console.log('fail');
            console.log(data,status);
            console.log(headers,config);
            $scope.showLoading = false;
            $scope.showForm = true;
          });
    }

}]);

voltControllers.controller('LabViewCntrl', ['$scope', '$http', function ($scope, $http) {
    console.log('LabViewCntrl');

    $http.get('/labs').
      success(function(data, status, headers, config) {
        console.log('Labs',data);
        if (data._embedded){
            $scope.labs = data._embedded.labs;
        }
      }).
      error(function(data, status, headers, config) {
        console.log('Error retrieving labs!',arguments);
      });

}]);
