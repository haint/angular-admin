define([
  //layout
  'layout/module',
  'layout/actions/minify-menu',
  'layout/actions/toggle-menu',
  'layout/actions/full-screen',
  'layout/actions/reset-widgets',

  'layout/directives/smart-include',
  'layout/directives/smart-menu',
  'layout/directives/search-autocomplete',
  'layout/directives/smart-router-animation-wrap',
  'layout/directives/smart-page-title',
  'layout/directives/smart-device-detect',
  'layout/directives/smart-fast-click',
  'layout/directives/smart-layout',
  'layout/directives/demo/demo-states',
  'layout/service/smart-css',
  
  //dashboard
  'dashboard/module',

  //account
  'auth/module',
  'auth/models/User',

  //components

  //activities
  'components/activities/activities-controller',
  'components/activities/activities-service',
  'components/activities/activities-dropdown-toggle-directive',

  'components/shortcut/toggle-shortcut',

  //language
  'components/language/Language',
  'components/language/language-selector',
  'components/language/language-controller',

  //projects
  'components/projects/Projects',
  'components/projects/recent-projects'

], function() {
  'use strict';
});