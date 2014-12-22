define(['layout/module', 'lodash'], function(module, _) {
  "use strict";

  module.registerDirective('smartRouterAnimationWrap', ['$rootScope', '$timeout', function($rootScope, $timeout) {
    return {
      restrict: 'A',
      compile: function (element, attributes) {
        element.removeAttr('smart-router-animation-wrap data-smart-route-animation-wrap wrap-for data-wrap-for');
        element.addClass('router-animation-container');

        var animateElementSelector = attributes.wrapFor;
        var viewsToMatch = attributes.smartRouterAnimationWrap.split(/\s/);

        var needRunContentViewAnimEnd = false;

        function contentViewAnimStart() {
          needRunContentViewAnimEnd = true;
          element.css({
            height: element.height() + 'px',
            overflow: 'hidden'
          }).addClass('active');

          $(animateElementSelector).addClass('animated faster fadeOutDown');
        }

        function contentViewAnimEnd() {
          if (needRunContentViewAnimEnd) {
            element.css({
              height: 'auto',
              overflow: 'visible'
            }).removeClass('active');

            $(animateElementSelector).addClass('animated faster fadeInUp');

            needRunContentViewAnimEnd = false;
            $timeout(function() {
              $(animateElementSelector).removeClass('animated');
            }, 10);
          }
        }

        var destroyForStart = $rootScope.$on('$stateChangeStart', 
          function(event, toState, toParams, fromState, fromParam) {
            var isAnimRequired = _.any(viewsToMatch, function(view) {
              return _.has(toState.views, view) || _.has(formState.views, view);
            });

            if (isAnimRequired) {
              contentViewAnimStart();
            }
          });

        var destroyForEnd = $rootScope.$on('$viewContentLoaded', function(event) {
          contentViewAnimEnd();
        });

        element.on('$destroy', function() {
          contentViewAnimStart();
          contentViewAnimEnd();
        });
      }
    }
  }]);
});