"use strict";

(function () {
    var api = Breinify.plugins.api;
    var common = api.getModule('common');
    var dataConfig = api.getModule('dataConfig');
    var staticCardSeries = api.getModule('staticCardSeries');
    var $ = Breinify.UTL._jquery();

    var module = {
        ready: function () {
            var _self = this;
            var config = {
                containerId: '#personalized-categories',
                namedRecommendations: ['wine', 'beer', 'spirits', 'non-alcoholic']
            }

            var $categoryContainer = $('#personalized-categories');

            // Breinify.UTL.internal.token(dataConfig.namedResources.apiToken, {
            //     'frameId': 'cbf636e0-1626-442b-8445-a2ebfa0f1c84'
            // }, function (error, response) {
            //     console.log('response: ', response);
            //     console.log('error: ', error);
            // });
            var url = dataConfig.namedResources.category.url;
            dataConfig.namedResources.getResource(url, function (data, error) {
                var recommendationOrders;

                if (window.location.pathname === '/demo' && window.location.hash === '') {
                    recommendationOrders = config.namedRecommendations
                } else {
                    recommendationOrders = dataConfig.recommendations.computeUrlSerials(config.namedRecommendations);
                }
                var series = _self.computeCategorySeries(data, recommendationOrders);
                var $cardLayouts = staticCardSeries.computeCardLayouts(series);
                $categoryContainer.append($cardLayouts);
                var $categoryCard = $('.category-card');

                if($categoryCard && $categoryCard.length) {
                    $categoryCard.click(function (event) {
                        var $ele = $(this);
                        var id = $ele.data("id");
                        var path = $ele.data("path");
                        var categoryUrl = $ele.data('url');
                        var categoryIndex = $ele.closest('.card-container').index();

                        if (window.location && id && path) {
                            var testFlag = '';
                            var tags = {
                                id: id,
                                path: path,
                                position: categoryIndex + 1,
                                url: categoryUrl
                            }
                            tags.image = $ele.prop('src');
                            tags.text = $ele.prop('alt');

                            _self.sendActivity(tags);
                            if (window.location.search === '?breinify=true' || /breinify=true/.test(window.location.hash)) {
                                testFlag = `?breinify=true`;
                            }
                            var baseUrl = `${window.location.origin}${window.location.pathname}#!recs=${path}${testFlag}`;
                            if(path === '/' || path=== '') {
                                baseUrl = `${categoryUrl}${testFlag}`;
                            }
                            window.location.replace(baseUrl);

                            setTimeout(function () {
                                window.location.reload();
                            }, 1000);
                        }
                    });
                }
            });
        },
        computeCategorySeries: function (data, recommendationOrders) {
            if(!$.isPlainObject(data)) return;

            var series = {title: '', defaultSegmentSettings: {}, seriesEntity: []};

            if (common.utils.isObject(data) && common.utils.isObject(data.categories))
                series.title = data.categories.title;
            if (common.utils.isObject(data) && common.utils.isObject(data.segmentSettings))
                series.defaultSegmentSettings = data.segmentSettings.default;

            recommendationOrders.forEach(function (recommendation, _) {
                var productContexts = {id: recommendation, categories: {}, segmentSettings: {}};
                if (common.utils.isObject(data['categories'])) {
                    var categories = data['categories'];
                    productContexts.categories = categories[recommendation];
                }
                if (common.utils.isObject(data['segmentSettings'])) {
                    var segmentSettings = data['segmentSettings'];
                    productContexts.segmentSettings = segmentSettings[recommendation];
                }

                series.seriesEntity.push(productContexts)
            })



            return series;
        },
        sendActivity:function(tags) {
            var type = 'clickedFeaturedCategory';
            Breinify.plugins.activities.scheduleDelayedActivity({}, type, tags);
        }
    };

    api.addModule('homePageCategories', module);
})()