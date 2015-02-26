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
              $scope.$parent.selectedFolder = _.find($scope.$parent.config.folders, {key: $stateParams.folder});
              $scope.messages = messages;
              $scope.$on('$inboxDeleteMessages', function(event) {
                angular.forEach($scope.messages, function(message, idx){
                  if (message.selected) {
                    message.$delete(function() {
                      $scope.messages.splice(idx, 1);
                    })
                  }
                });
              });
            },
            resolve: {
              messages: function(InboxMessage, $stateParams) {
                return InboxMessage.query({folder: $stateParams.folder});
              }
            }
          }
        }
      })
      .state('app.inbox.folder.detail', {
        url: '/detail/:message',
        views: {
          'inbox@app.inbox': {
            templateUrl: 'app/components/inbox/views/inbox-detail.tpl.html',
            controller: function($scope, message) {
              $scope.message = message;
            },
            resolve: {
              message: function(InboxMessage, $stateParams) {
                return InboxMessage.get({id: $stateParams.message})
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