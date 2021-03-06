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

      // Stats Display With Flot Chart

      var twitter = [
        [1, 27],
        [2, 34],
        [3, 51],
        [4, 48],
        [5, 55],
        [6, 65],
        [7, 61],
        [8, 70],
        [9, 65],
        [10, 75],
        [11, 57],
        [12, 59],
        [13, 62]
      ];

      var facebook = [
        [1, 25],
        [2, 31],
        [3, 45],
        [4, 37],
        [5, 38],
        [6, 40],
        [7, 47],
        [8, 55],
        [9, 43],
        [10, 50],
        [11, 47],
        [12, 39],
        [13, 47]
      ];

      $scope.statsData = [
        {
          label: "Twitter",
          data: twitter,
          lines: {
            show: true,
            lineWidth: 1,
            fill: true,
            fillColor: {
              colors: [
                {
                  opacity: 0.1
                },
                {
                  opacity: 0.13
                }
              ]
            }
          },
          points: {
            show: true
          }
        },
        {
          label: "Facebook",
          data: facebook,
          lines: {
            show: true,
            lineWidth: 1,
            fill: true,
            fillColor: {
              colors: [
                {
                  opacity: 0.1
                },
                {
                  opacity: 0.13
                }
              ]
            }
          },
          points: {
            show: true
          }
        }
      ];

      $scope.statsDisplayOptions = {
        grid: {
          hoverable: true
        },
        colors: ["#568A89", "#3276B1"],
        tooltip: true,
        tooltipOpts: {
          defaultTheme: false
        },
        xaxis: {
          ticks: [
            [1, "JAN"],
            [2, "FEB"],
            [3, "MAR"],
            [4, "APR"],
            [5, "MAY"],
            [6, "JUN"],
            [7, "JUL"],
            [8, "AUG"],
            [9, "SEP"],
            [10, "OCT"],
            [11, "NOV"],
            [12, "DEC"],
            [13, "JAN+1"]
          ]
        },
        yaxis: {

        }
      };

      // Live stats revenew

      function revenueElementToggle(element, toggle) {
        if (toggle) {
          if ($scope.revenueData.indexOf(element) == -1) $scope.revenueData.push(element);
        } else {
          $scope.revenueData = _.without($scope.revenueData, element);
        }
      }

      $scope.revenueDisplayOptions = {
        grid: {
          hoverable: true
        },
        tooltip: true,
        tooltipOpts: {
          content: '%x - %y',
          dateFormat: '%b %y',
          defaultTheme: false
        },
        xaxis: {
          mode: 'time'
        },
        yaxis: {
          tickFormatter: function(val, axis) {
            return "$" + val;
          },
          max: 1200
        }
      }

      var trgt = [[1354586000000, 153], [1364587000000, 658], [1374588000000, 198], [1384589000000, 663], [1394590000000, 801], [1404591000000, 1080], [1414592000000, 353], [1424593000000, 749], [1434594000000, 523], [1444595000000, 258], [1454596000000, 688], [1464597000000, 364]],
          prft = [[1354586000000, 53], [1364587000000, 65], [1374588000000, 98], [1384589000000, 83], [1394590000000, 980], [1404591000000, 808], [1414592000000, 720], [1424593000000, 674], [1434594000000, 23], [1444595000000, 79], [1454596000000, 88], [1464597000000, 36]],
          sgnups = [[1354586000000, 647], [1364587000000, 435], [1374588000000, 784], [1384589000000, 346], [1394590000000, 487], [1404591000000, 463], [1414592000000, 479], [1424593000000, 236], [1434594000000, 843], [1444595000000, 657], [1454596000000, 241], [1464597000000, 341]];

      var targets = {
        label: 'Target Profit',
        data: trgt,
        bars: {
          show: true,
          align: 'center',
          barWidth: 30 * 30 * 60 * 1000 * 80
        }
      };

      $scope.targetsShow = true;      

      $scope.$watch('targetsShow', function(toggle) {
        revenueElementToggle(targets, toggle);
      });

      var actuals = {
        label: 'Actual Profit',
        data: prft,
        color: '#3276B1',
        lines: {
          show: true,
          lineWidth: 3
        },
        points: {
          show: true
        }
      };

      $scope.actualsShow = true;

      $scope.$watch('actualsShow', function(toggle) {
        revenueElementToggle(actuals, toggle);
      });

      var signups = {
        label: 'Actual Signups',
        data: sgnups,
        color: '#71843F',
        lines: {
          show: true,
          lineWidth: 1
        },
        points: {
          show: true
        }
      };

      $scope.signupsShow = true;

      $scope.$watch('signupsShow', function(toggle) {
        revenueElementToggle(signups, toggle);
      })

      $scope.revenueData = [targets];

      $scope.events = [];

      CalendarEvent.query().$promise.then(function(events) {
        $scope.events = events;
      });

      // bird eye widget data
      $scope.countriesVisitsData = {
        "US": 4977,
        "AU": 4873,
        "IN": 3671,
        "BR": 2476,
        "TR": 1476,
        "CN": 146,
        "CA": 134,
        "BD": 100,
        "VN": 4689
      };
  }]);

});