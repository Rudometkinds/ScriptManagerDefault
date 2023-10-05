(function () {

    // if the plugin is available we can go on
    var api = Breinify.plugins.api;
    var $ = Breinify.UTL._jquery();
    var config = api.getModule('config');
    var common = api.getModule('common');

    var module = {
        recommendations: {
            computeUrlSerials: function(series) {
                if(!$.isArray(series)) return;

                if (window.location && window.location.hash != '') {
                    var pathConfig = config.pathConfig;
                    var seriesEntity = common.utils.convertArrayToObject(series);
                    var demoNamePrefix = pathConfig.demoNamePrefix;
                    var hashPaths = window.location.hash.match(pathConfig.matchers.hash);

                    if ($.isArray(hashPaths) && hashPaths.length) {
                        var _self = this;
                        var hideRegex = new RegExp(pathConfig.matchers.hide);
                        var pathRegex = new RegExp(pathConfig.matchers.path);
                        var demoNumberRegex = new RegExp(/\d/, 'gm');
                        var updatedSeries = [];

                        if (hashPaths.length === series.length) {
                            hashPaths.forEach(function (path, _) {
                                if (!hideRegex.test(path)) {
                                    var position = _self.computePathNumber(path);
                                    var seriesIndex = position -1;

                                    if(seriesEntity[seriesIndex] !== undefined)
                                        updatedSeries.push(seriesEntity[seriesIndex])
                                }
                            });


                        } else {
                            var definedPaths = [];
                            var ignoredPaths = [];
                            var modelSeries =Array.from({length: series.length}, (_, i) => i + 1);

                            hashPaths.forEach(function (path, _) {
                                var recommendationNumber = _self.computePathNumber(path);
                                if (!hideRegex.test(path)) {
                                    definedPaths.push(recommendationNumber)
                                } else {
                                    ignoredPaths.push(recommendationNumber);
                                }
                            });

                            var filteredSeries = Array.from(new Set(definedPaths.concat(modelSeries)));
                            var filteredModelSeries = _self.mergeTwoArrays(filteredSeries, ignoredPaths);

                            if ($.isArray(filteredModelSeries)) {
                                filteredModelSeries.forEach(function (position, index) {
                                    var seriesIndex = position -1;
                                    if(seriesEntity[seriesIndex] !== undefined)
                                        updatedSeries.push(seriesEntity[seriesIndex]);
                                })
                            }
                        }
                        return updatedSeries;
                    } else {
                        return series;
                    }

                } else {
                    return series;
                }
            },
            computeRecommendationContexts: function(namedRecommendations, liquorTypes) {

                if (window.location && window.location.hash != '') {
                    var pathConfig = config.pathConfig;
                    var demoNamePrefix = pathConfig.demoNamePrefix;
                    var hashPaths = window.location.hash.match(pathConfig.matchers.hash);


                    if ($.isArray(hashPaths) && hashPaths.length) {
                        var _self = this;
                        var hideRegex = new RegExp(pathConfig.matchers.hide);
                        var pathRegex = new RegExp(pathConfig.matchers.path);
                        var demoNumberRegex = new RegExp(/\d/, 'gm');
                        var updatedConfig = [];

                        if (hashPaths.length === namedRecommendations.length) {
                            hashPaths.forEach(function (path, _) {
                                if (!hideRegex.test(path)) {
                                    var recommendationNumber = _self.computePathNumber(path);
                                    var localConfig = _self.computeRecommendationEntity(recommendationNumber, liquorTypes);
                                    if(localConfig)
                                        updatedConfig.push(localConfig)
                                }
                            });
                        } else {
                            var definedPaths = [];
                            var ignoredPaths = [];
                            var modelSeries =Array.from({length: namedRecommendations.length}, (_, i) => i + 1)

                            hashPaths.forEach(function (path, _) {
                                var recommendationNumber = _self.computePathNumber(path);
                                if (!hideRegex.test(path)) {
                                    definedPaths.push(recommendationNumber)
                                } else {
                                    ignoredPaths.push(recommendationNumber);
                                }
                            });

                            var filteredSeries = Array.from(new Set(definedPaths.concat(modelSeries)));
                            var filteredModelSeries = _self.mergeTwoArrays(filteredSeries, ignoredPaths);

                            if ($.isArray(filteredModelSeries)) {
                                filteredModelSeries.forEach(function (series, index) {
                                    var configEntity = _self.computeRecommendationEntity(series, liquorTypes);
                                    if(configEntity)
                                        updatedConfig.push(configEntity);
                                })
                            }
                        }
                        return updatedConfig;
                    } else {
                        return namedRecommendations;
                    }
                } else {
                    return namedRecommendations;
                }
            },
            computePathNumber: function (path) {
                var demoNumberRegex = new RegExp(/\d/, 'gm');
                var numberMetric = path.match(demoNumberRegex);

                if ($.isArray(numberMetric) && numberMetric.length) {
                    return parseInt(numberMetric[0], 10);
                }

                return null;
            },
            computeRecommendationEntity: function (pathNumber, liquorTypes) {
                var _self = this;
                var pathConfig = config.pathConfig;
                var demoNamePrefix = pathConfig.demoNamePrefix;
                var queryNamePrefix = pathConfig.queryNamePrefix;
                var liquorType = _self.computeQueryRecommendationName(pathNumber, liquorTypes);

                var localConfig = {namedRecommendations: [], recommendationQueryName: ''};

                localConfig.namedRecommendations.push(`${demoNamePrefix}${pathNumber}`);
                localConfig.recommendationQueryName = `${queryNamePrefix}${pathNumber}-${liquorType}`;


                return localConfig;
            },
            computeQueryRecommendationName: function (pathNumber, liquorTypes) {
                var liquorType = liquorTypes[0];

                return liquorTypes[pathNumber - 1];
            },
            mergeTwoArrays: function (sourceArray, ignoredArray) {
                var filteredArray = [];
                if(!ignoredArray.length) return sourceArray;

                sourceArray.forEach(function(item, index) {
                    if(ignoredArray.indexOf(item) === -1) filteredArray.push(item)
                })

                return filteredArray;
            }
        },
        namedResources: {
            category: {
              url: 'https://assets.breinify.com/frame/cbf636e0-1626-442b-8445-a2ebfa0f1c84',
            },
            getResource: function(url, cb) {
                return $.get(
                    url,
                    function(data) {
                        cb(data, undefined)
                    },
                    "json"
                ).fail(function(error) {
                    cb(undefined, error)
                });
            }
        }
    };

    api.addModule('dataConfig', module);
})();