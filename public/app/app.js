define([
  'angular',
  'angular-couch-potato',
  'angular-ui-router',
  'angular-animate',
  'angular-bootstrap'
], function(ng, couchPotato) {

  var app = ng.module('app', [
    'scs.couch-potato',
    'ngAnimate',
    'ui.router',
    'ui.bootstrap'
  ]);

  couchPotato.configureApp(app);

  return app;
});