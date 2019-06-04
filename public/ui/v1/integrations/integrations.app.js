angular.module('SOS1819-app.integrations', ['ngRoute', 'SOS1819-app', 'SOS1819-app.majorDisastersApp'])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/integrations', {
                controller: 'integrationsCtrl',
                reloadOnSearch: true,
                templateUrl: '/ui/v1/integrations/integrations.template.html',
                resolve: {
                    initialData: function($http, MajorDisaster, Hurricanes, Cities, Dogs, Advice, TestingOfNuclearBombs, PollutionStats, SportsCenters, WeatherStats, DonaldTrump, $location, $q) {
                        var initialData = {};
                        var majorDisastersPromises = [
                            MajorDisaster.v1.list({}),
                            PollutionStats.list({}),
                            SportsCenters.list({}),
                            WeatherStats.list({}),
                            DonaldTrump.random(),
                            DonaldTrump.random(),
                            DonaldTrump.random(),
                            Dogs.list(),
                            Advice.list(),
                            Cities.list()
                        ];

                        var hurricanesPromises = [
                            Hurricanes.get(),
                            $http.get("/proxy/country-stats"),
                            $http.get("/proxy/computers-attacks-stats"),
                            $http.get("/proxy/poke"),
                            $http.get("/proxy/got"),
                            $http.get("/proxy/cn"),
                            $http.get("https://breaking-bad-quotes.herokuapp.com/v1/quotes")
                        ];

                        var bombsPromises = [
                            TestingOfNuclearBombs.get(),
                            $http.get("/proxy/youth-unemployment-stats"),
                            $http.get("/proxy/emigrations-by-countries"),
                            $http.get("/proxy/marcas-vehiculos"),
                            $http.get("/proxy/albums"),
                            $http.get("/proxy/poblacionUSA"),
                            $http.get("/proxy/middleUS"),
                            $http.get("/proxy/NFLarrestos")
                        ];

                        initialData.disasters = $q.all(majorDisastersPromises).then(function(res) {
                            return {
                                data: res[0].data,
                                ext1: res[1].data,
                                ext2: res[2].data,
                                ext3: res[3].data,
                                ext4: [
                                    res[4].data,
                                    res[5].data,
                                    res[6].data
                                ],
                                ext5: res[7].data,
                                ext6: res[8].data,
                                ext7: res[9].data
                            };

                        }).catch(function(res) {
                            return {
                                data: [],
                                ext1: [],
                                ext2: [],
                                ext3: [],
                                ext4: []
                            };
                        });

                        initialData.hurricanes = $q.all(hurricanesPromises).then(function(res) {
                            return {
                                data: res[0].data,
                                ext1: res[1].data,
                                ext2: res[2].data,
                                ext3: res[3].data,
                                ext4: res[4].data,
                                ext5: res[5].data,
                                ext6: res[6].data


                            };
                        }).catch(function(res) {
                            return {
                                data: []
                            };
                        });

                        initialData.bombs = $q.all(bombsPromises).then(function(res) {
                            return {
                                data: res[0].data,
                                ext1: res[1].data,
                                ext2: res[2].data,
                                ext3: res[3].data,
                                ext4: res[4].data,
                                ext5: res[5].data,
                                ext6: res[6].data,
                                ext7: res[7].data
                            };
                        }).catch(function(res) {
                            return {
                                data: []
                            };
                        });

                        return $q.all(initialData);
                    }
                }
            });
    });