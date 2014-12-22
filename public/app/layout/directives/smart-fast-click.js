define(['layout/module', 'require', 'fastclick'], function(module, require) {
  'use strict';

  module.registerDirective('smartFastClick', function() {
    var FastClick = require('fastclick');
    return {
      restrict: 'A',
      compile: function(element, attributes) {
        element.removeAttr('smart-fast-click data-smart-fast-click');
        FastClick.attch(element);
        if (!FastClick.notNeeded()) element.addClass('needsclick');
      }
    }
  });
});