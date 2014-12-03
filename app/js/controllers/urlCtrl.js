'use strict';
angular.module('controllers').controller('urlCtrl', function($scope) {
  $scope.urlFunc = function (bigString) {
    $scope.url = bigString.split('url=')[1];
  };
});
