module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      '../../bower_components/angular/angular.js',
      '../../bower_components/angular-route/angular-route.js',
      '../../bower_components/angular-resource/angular-resource.js',
      '../../bower_components/angular-animate/angular-animate.js',
      '../../bower_components/angular-mocks/angular-mocks.js',
      '../static/js/*.js',
      'unit/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
