/**
 * Testing
 * */




describe('Volt App', function() {


    describe('Testing the / redirect', function(){
        browser.get('/');
        browser.getLocationAbsUrl().then(function(url) {
            expect(url.split('#')[1]).toBe('/labs');
         });
    });

    describe('Phone list view', function() {
        beforeEach(function() {
          browser.get('#/labs');
        });
        for (var i=1; i<3; i += 1){
            describe('Phone detail view ' + i, function() {
                var id = i;
                beforeEach(function() {
                    browser.get('#/labs/'+id);
                });
                it('should display placeholder page with phoneId', function() {
                  expect(element(by.binding('lab.ID')).getText()).toBe('Lab Number: '+id);
                });
            });
        }
    });

    describe('Job list view', function() {

        beforeEach(function() {
                browser.get('/');
        });


        it('should filter the phone list as a user types into the search box', function() {

            var labList = element.all(by.repeater('l in labs'));
            var query = element(by.model('query'));

            expect(labList.count()).toBe(2);

            query.sendKeys('tesla');
            expect(labList.count()).toBe(1);

            query.clear();
            query.sendKeys('e');
            expect(labList.count()).toBe(2);


            query.clear();
            query.sendKeys('wfefwefwefy');
            expect(labList.count()).toBe(0);
        });

        it('should be possible to control phone order via the drop down select box', function() {

          var columns = element.all(by.repeater('l in labs').column('l.Name'));
          var query = element(by.model('query'));

          function getNames() {
            return columns.map(function(elm) {
              return elm.getText();
            });
          }

          query.sendKeys('tesla'); //let's narrow the dataset to make the test assertions shorter

          expect(getNames()).toEqual([
            "Name: Tesla Coil"
          ]);


        });
    });
});

