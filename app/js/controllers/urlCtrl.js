'use strict';
angular.module('controllers').controller('urlCtrl', function($scope, news) {
  $scope.urlFunc = function (bigString) {
    $scope.url = bigString.split('url=')[1];
  };
});
