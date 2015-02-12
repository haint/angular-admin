define([
  'angular',
  'angular-couch-potato',
  'lodash',
  'angular-ui-router',
  'angular-resource'
], function(ng, couchPotato, _) {

  'use strict';

  var module = ng.module('app.inbox', ['ui.router', 'ngResource']);

  couchPotato.configureApp(module);

  module.config(['$stateProvider', '$couchPotatoProvider',function($stateProvider, $couchPotatoProvider) {
    
    $stateProvider
      .state('app.inbox', {
        url: '/inbox',
        data: {
          title: 'Inbox'
        },
        views: {
          content: {
            templateUrl: 'app/components/inbox/views/inbox-layout.tpl.html',
            controller: function($scope, config) {
              $scope.config = config.data;
              $scope.deleteSelected = function() {
                $scope.$broadcast('$inboxDeleteMessages');
              }
            },
            controllerAs: 'inboxCtrl',
            resolve: {
              deps: $couchPotatoProvider.resolveDependencies([
                'components/inbox/directives/message-labels'
              ]),
              config: function(InboxConfig) {
                return InboxConfig;
              }
            }
          }
        }
      })
      .state('app.inbox.folder', {
        url: '/:folder',
        views: {
          inbox: {
            templateUrl: 'app/components/inbox/views/inbox-folder.tpl.html',
            controller: function($scope, messages, $stateParams) {

            },
            resolve: {
              messages: function(InboxMessage, $stateParams) {
                return InboxMessage.query({folder: $stateParams.folder});
              }
            }
          }
        }
      });
  }]);

  module.run(function($couchPotato) {
    module.lazy = $couchPotato;
  });

  return module;
});