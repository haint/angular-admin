define([
  'angular',
  'angular-couch-potato',
  'angular-ui-router'
], function(ng, couchPotato) {
  "use strict";

  var module = ng.module('app.auth', ['ui.router']);

  couchPotato.configureApp(module);

  module.run(['$couchPotato', function($couchPotato){
    module.lazy = $couchPotato;
  }]);

  return module;
});
