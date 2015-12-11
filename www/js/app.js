// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

(function(){
var app = angular.module('tba', ['ionic', 'angularMoment', 'starter.controllers', 'starter.services'])


app.controller('TBACtrl', function($http, $scope){

$scope.stories = [];

function loadStories(params,callback){
      var stories = [];

$http.get('https://www.reddit.com/r/funny/new/.json', {params: params}).success(function(response){
  angular.forEach(response.data.children, function(child){
    stories.push(child.data);
    console.log(child.data);
        });
    callback(stories);
    });
}

$scope.loadOlderStories = function(){
var params = {};
if ($scope.stories.length > 0){
  params['after'] = $scope.stories[$scope.stories.length-1].name;
  }

  loadStories(params, function(olderStories){
  $scope.stories = $scope.stories.concat(olderStories/*param for this callback*/);
  $scope.$broadcast('scroll.infiniteScrollComplete');
  });
 };

$scope.getNewerStories = function(){ //why add to scope? add function to ctrl?
   var params = {'before' : $scope.stories[0].name};

   loadStories(params, function(newerStories/*name param for this callback*/){
    $scope.stories = newerStories.concat($scope.stories);
    $scope.$broadcast('scroll.refreshComplete');
   });
  };

});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
}());