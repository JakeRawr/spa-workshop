
angular.module('controllers').controller('CityCtrl', function($scope, $routeParams, $log, geoLocation, forecast, news) {
  'use strict';
  this.cityName = $routeParams.city;
  this.state = $routeParams.state;

  // Need to assign this to another variable in order to use it in nested contexts.
  var self = this;
  // Flatten the promise chain for better readability.
  // http://solutionoptimist.com/2013/12/27/javascript-promise-chains-2/
  geoLocation(this.cityName, this.state)
    .then(function(latLong) {
      return forecast(latLong[0], latLong[1]);
    })
    .then(function(forecast) {
      self.forecast = forecast.data;
      self.currentFore = forecast.data.currently;
      return news(self.cityName);
    })
    .then(function(news) {
      self.news = news;
      self.listNews = [];
      for(var i = 0; i < news.length; i++){
        var newsObj = {};
        newsObj.title = news[i].title.split(' - ')[0];
        newsObj.url = news[i].href.split('url=')[1];
        self.listNews.push(newsObj);
      }
    })
    .catch(function(err) {
      $log.error(err);
    });
});
