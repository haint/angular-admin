define(['dashboard/module', 'lodash'], function(module, _) {

  'use strict';

  module.registerController('DashboardCtrl', ['$scope', '$interval', 'CalendarEvent',
    function($scope, $interval, CalendarEvent) {

      function getFakeItem(index, prevValue) {
        var limitUp = Math.min(100, prevValue + 5);
        var limitDown = Math.abs(prevValue - 5);
        return [
          index,
          _.random(limitDown, limitUp, true)
        ]
      }

      function getFakeData() {
        return _(_.range(199)).reduce(function (out, number) {
          out.push(getFakeItem(number+1, _.last(out)[1]));
          return out;
        }, [
          [0, 50] //start point
        ])
      }

      $scope.autoUpdate = false;

      var updateInterval;
      $scope.$watch('autoUpdate', function(autoUpdate) {

        if (autoUpdate) {
          updateInterval = $interval(function() {
            var stats = _.rest($scope.liveStats[0]).map(function(elem, i) {
              elem[0] = i;
              return elem;
            });
            stats.push([199, _.last(stats)[1]]);
            $scope.liveStats = [stats];
          }, 1500);
        } else {
          $interval.cancel(updateInterval);  
        }
      });

      $scope.liveStats = [getFakeData()];

      $scope.liveStatsOptions = {
        yaxis: {
          min: 0,
          max: 100
        },
        xaxis: {
          min: 0,
          max: 100
        },
        colors: ['rgb(87, 136, 156)'],
        series: {
          lines: {
            lineWidth: 1,
            fill: true,
            fillColor: {
              colors: [
                {
                  opacity: 0.4
                },
                {
                  opacity: 0
                }
              ]
            },
            steps: false
          }
        }
      };

      //

  }]);

});