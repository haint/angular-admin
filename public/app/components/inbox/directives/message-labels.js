define(['components/inbox/module', 'lodash'], function(module, _) {
  
  'use strict';
  return module.registerDirective('messageLabels', ['InboxConfig', function(InboxConfig) {
    return {
      restrict: 'E',
      replace: true,
      link: function(scope, element) {

        if(scope.message.labels && scope.message.labels.length) {
          InboxConfig.success(function(config) {
            var html = _.map(scope.message.labels, function(label) {
              return '<span class="label bg-color-' + config.labels[label].color + '">'
               + config.labels[label].name + '</span>';
            }).join('');
            element.replaceWith(html);
          });
        } else {
          element.replaceWith('');
        }
      }
    }
  }]);
})