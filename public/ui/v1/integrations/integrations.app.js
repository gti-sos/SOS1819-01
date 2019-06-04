angular.module('SOS1819-app.integrations', ['ngRoute', 'SOS1819-app', 'SOS1819-app.majorDisastersApp'])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/integrations', {
                controller: 'integrationsCtrl',
                reloadOnSearch: true,
                templateUrl: '/ui/v1/integrations/integrations.template.html',
                resolve: {
                    initialPromises: function($http, MajorDisaster, Hurricanes, Cities, Dogs, Advice, TestingOfNuclearBombs, PollutionStats, SportsCenters, WeatherStats, DonaldTrump, $location, $q) {
                        
                    }
                }
            });
    });