/**
 * Testing
 * */

describe('PeopleListCtrl', function(){

    beforeEach(module('voltApp'));

    it('should be at least 2 job records', inject(function($controller) {
        var scope = {},
        ctrl = $controller('PeopleListCtrl', {$scope:scope});

        expect(scope.jobs.length).toBeGreaterThan(1);
        expect(scope.name).toBe('Go');
    }));

});


describe('Volt App', function() {

    describe('Job list view', function() {

        beforeEach(function() {
                browser.get('/');
        });


        it('should filter the phone list as a user types into the search box', function() {

            var jobList = element.all(by.repeater('j in jobs'));
            var query = element(by.model('query'));

            expect(jobList.count()).toBe(3);

            query.sendKeys('mary');
            expect(jobList.count()).toBe(1);

            query.clear();
            query.sendKeys('ma');
            expect(jobList.count()).toBe(2);
        });
    });
});

